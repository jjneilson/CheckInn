package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.DTOs.PasswordDTO;
import com.checkinn.checkinn.DTOs.UserLoginDTO;
import com.checkinn.checkinn.Entities.Role;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Repositories.RoleRepository;
import com.checkinn.checkinn.Repositories.UserRepository;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.web.server.ResponseStatusException;

import java.security.Key;
import java.util.Date;

import static com.checkinn.checkinn.Constants.GeneralConstants.*;

@Service
public class AuthService {

    @Value("${jwt.secret}")
    private String secretKey;

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public AuthService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;

    }

    /**
     * Generates a signing key using the secret key.
     *
     * @return the signing key
     */
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generates a JWT token for the supplied user.
     * Contains user's ID, first name, last name, and email.
     * Will contain role information in the future as well.
     *
     * @param user the user to generate the token for
     * @return JWT token as a string
     */
    public String generateToken(User user) {
        return Jwts.builder()
                .claim("userId", user.getUserId())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("email", user.getEmail())
                .claim("roleName", user.getRole().getRoleName())
                .claim("isAdmin", user.getRole().isAdmin())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30 minutes
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Decodes a JWT token and converts it to get the user's ID.
     *
     * @param token the JWT token to decode
     * @return a UserDTO containing the user ID
     * @throws ResponseStatusException if the token is incorrectly formed or expired
     */
    public int decodeToken(String token) {
        try {
            var claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.get("userId", Integer.class);
        }
        catch (JwtException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Checks if the user associated with a supplied JWT token is an admin.
     *
     * @param token the JWT token to read
     * @return true if user exists and is admin, false otherwise
     */
    public boolean isAdmin(String token) {
        int userId = decodeToken(token);
        User user = userRepository.findById(userId).orElse(null);
        return !(user == null || !user.getRole().isAdmin());
    }

    /**
     * Checks if the user associated with a supplied JWT token is an admin.
     * Throws an exception if the token is invalid or the user is not an admin.
     *
     * @param token the JWT token to read
     * @throws ResponseStatusException if user does not exist or is not admin
     */
    public void isAdminThrowOtherwise(String token) {
        int userId = decodeToken(token);
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        if (!user.getRole().isAdmin()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    /**
     *  Checks if the supplied userId matches a specified ID.
     *  THIS IS BYPASSED WITH ADMIN PERMISSIONS.
     *
     * @param token the JWT token to read
     * @param userId ID to compare against and check for equality
     * @throws ResponseStatusException if the userIds don't match
     */
    public void tokenMatchesUserThrowOtherwise(String token, int userId) {
        if (decodeToken(token) != userId && !isAdmin(token)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    /**
     * Registers a new user and save them to the database.
     * The user's email must not already be registered.
     * The user's password will be securely hashed before storage.
     *
     * @param user the user to be registered
     * @param adminRequest if false, enforces default role on user
     * @throws ResponseStatusException if the email is already registered
     */
    public void registerUser(User user, boolean adminRequest) {
        // Data validation
        if (user.getFirstName().isBlank()) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST); }
        if (user.getLastName().isBlank()) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST); }
        if (!user.getEmail().matches(EMAIL_REGEX)) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST); }
        if (!user.getPassword().matches(PASSWORD_REGEX)) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST); }

        // User's email cannot already be registered
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "EMAIL ALREADY REGISTERED");
        }

        // Force email to be lowercase
        user.setEmail(user.getEmail().toLowerCase());

        // If not an admin request or role is not specified, force set role to default role
        if (!adminRequest || user.getRole() == null) {
            Role defaultRole = roleRepository.findByRoleName(DEFAULT_ROLE_NAME).orElseThrow();
            user.setRole(defaultRole);
        }

        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
    }

    /**
     * Log in a user.
     * If the credentials are valid, generate and return a JWT token.
     *
     * @param user the UserLoginDTO containing the email and password of the user attempting to log in
     * @return a JWT token as a string if the login is successful
     * @throws ResponseStatusException if the user's email is not found or the password is incorrect
     */
    public String loginUser(UserLoginDTO user) {
        User foundUser = userRepository.findByEmail(user.getEmail()).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "INVALID EMAIL OR PASSWORD"));

        // Password must match the hashed password
        if (!BCrypt.checkpw(user.getPassword(), foundUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "INVALID EMAIL OR PASSWORD");
        }

        return generateToken(foundUser);
    }

    /**
     * Updates the password for a specified user.
     *
     * @param userId ID of user to update their password
     * @param passwordDTO object containing new and old passwords.\
     * @throws ResponseStatusException if user does not exist or password is incorrect for the given user
     */
    public void editUserPassword(int userId, PasswordDTO passwordDTO) {
        // Data validation
        if (!passwordDTO.getNewPassword().matches(PASSWORD_REGEX)) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "PASSWORD DOES NOT MEET REQUIREMENTS"); }

        // User must exist
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        // Password must match the hashed password
        if (!BCrypt.checkpw(passwordDTO.getOldPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "INCORRECT PASSWORD");
        }

        user.setPassword(hashPassword(passwordDTO.getNewPassword()));
        userRepository.save(user);
    }

    public String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
