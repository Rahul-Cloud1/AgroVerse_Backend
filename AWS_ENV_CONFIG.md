# Environment Variables Configuration for AWS Deployment

## Required Environment Variables

Your application requires the following environment variables to be configured in AWS:

### 1. MONGO_URI
- **Description**: MongoDB connection string
- **Current Value**: `mongodb+srv://agroverse:Agroverse%402004@agroverse.dveiewz.mongodb.net/?retryWrites=true&w=majority&appName=AgroVerse`
- **Security**: Store as a secure parameter in AWS Systems Manager Parameter Store

### 2. JWT_SECRET
- **Description**: Secret key for JWT token signing
- **Current Value**: `qwertyuiop`
- **Security**: Store as a SecureString parameter in AWS Systems Manager Parameter Store
- **Recommendation**: Generate a stronger secret for production

### 3. NODE_ENV
- **Description**: Node.js environment
- **Production Value**: `production`

### 4. PORT
- **Description**: Port the application listens on
- **Default**: `5000`
- **AWS**: May be overridden by AWS services (e.g., Elastic Beanstalk uses 8080)

## AWS Configuration Methods

### Option 1: AWS Systems Manager Parameter Store (Recommended for ECS)

1. **Create parameters in AWS Console:**
   ```bash
   # Create MONGO_URI as SecureString
   aws ssm put-parameter \
     --name "/agroverse/mongo-uri" \
     --value "your-mongo-uri" \
     --type "SecureString" \
     --description "MongoDB connection string for Agroverse"

   # Create JWT_SECRET as SecureString
   aws ssm put-parameter \
     --name "/agroverse/jwt-secret" \
     --value "your-stronger-jwt-secret" \
     --type "SecureString" \
     --description "JWT secret for Agroverse authentication"
   ```

2. **Update ECS task definition** with parameter ARNs (see ecs-task-definition.json)

### Option 2: Elastic Beanstalk Environment Variables

1. **Via AWS Console:**
   - Go to Elastic Beanstalk → Your Environment → Configuration
   - Software → Environment Properties
   - Add:
     - `MONGO_URI`: `your-mongo-uri`
     - `JWT_SECRET`: `your-jwt-secret`
     - `NODE_ENV`: `production`

2. **Via EB CLI:**
   ```bash
   eb setenv MONGO_URI="your-mongo-uri" JWT_SECRET="your-jwt-secret" NODE_ENV="production"
   ```

### Option 3: EC2 Environment Variables

1. **Create .env file on EC2 instance:**
   ```bash
   sudo nano /opt/agroverse/.env
   ```

2. **Add variables:**
   ```
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
   NODE_ENV=production
   PORT=5000
   ```

## Security Best Practices

1. **Never commit .env files to version control**
2. **Use strong JWT secrets** (32+ characters, random)
3. **Rotate secrets regularly**
4. **Use AWS IAM roles** for service authentication
5. **Enable encryption** for Parameter Store SecureStrings
6. **Monitor access** to sensitive parameters

## MongoDB Atlas Considerations

Since you're using MongoDB Atlas:

1. **Whitelist AWS IP ranges** in Atlas Network Access
2. **Consider VPC Peering** for better security
3. **Use Atlas Data API** as an alternative for serverless deployments
4. **Monitor connection limits** based on your Atlas tier