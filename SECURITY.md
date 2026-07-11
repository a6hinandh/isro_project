# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in AstraQ, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Email the maintainers at **a6hinandh@gmail.com** with:
   - A description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
3. You will receive an acknowledgment within 48 hours.

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (main branch) | Yes |
| Older releases | No |

## Security Measures

### Client-Side

- No secrets are stored in client-side code — Firebase web config is public by design
- Authentication tokens are managed via Firebase SDK (httpOnly where possible)
- All API communication uses HTTPS in production
- No user-generated content is rendered as raw HTML (React's default XSS protection)

### Authentication

- Firebase Authentication with email/password provider
- ID tokens are verified server-side on every API request with revocation checking
- Tokens expire after 1 hour and are automatically refreshed by the Firebase SDK

### Data Privacy

- All user data (conversations, preferences) is scoped per-user via Firebase Auth UID
- No analytics or tracking scripts are included
- File uploads are processed transiently for text extraction only

## Dependencies

We regularly update dependencies to patch known vulnerabilities. Run `npm audit` to check the current state.
