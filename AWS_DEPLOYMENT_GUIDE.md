# AWS Deployment Guide for Agroverse Backend

This guide provides multiple deployment options for your Node.js Agroverse backend on AWS.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Docker** installed locally
4. **Node.js** and npm installed
5. **Git** for version control

## Deployment Options

### Option 1: AWS Elastic Beanstalk (Recommended for beginners)

**Best for:** Simple deployment with minimal configuration

#### Step 1: Install EB CLI
```bash
pip install awsebcli --upgrade --user
```

#### Step 2: Initialize Elastic Beanstalk
```bash
cd "C:\Users\admin\Desktop\Major Project\AgroverseBackend-main\AgroverseBackend-main\Agroverse Backend"
eb init
```

Select:
- Region: Choose closest to your users (e.g., us-east-1)
- Application name: `agroverse-backend`
- Platform: Node.js
- Platform version: Latest Node.js version

#### Step 3: Create Environment
```bash
eb create production
```

#### Step 4: Set Environment Variables
```bash
eb setenv MONGO_URI="mongodb+srv://agroverse:Agroverse%402004@agroverse.dveiewz.mongodb.net/?retryWrites=true&w=majority&appName=AgroVerse" JWT_SECRET="qwertyuiop" NODE_ENV="production"
```

#### Step 5: Deploy
```bash
eb deploy
```

#### Step 6: Open Application
```bash
eb open
```

### Option 2: Amazon ECS with Fargate (Recommended for production)

**Best for:** Scalable, containerized applications

#### Step 1: Build and Push Docker Image
```bash
# Build Docker image
docker build -t agroverse-backend .

# Create ECR repository
aws ecr create-repository --repository-name agroverse-backend --region us-east-1

# Get login token and login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag agroverse-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/agroverse-backend:latest

# Push image
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/agroverse-backend:latest
```

#### Step 2: Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name agroverse-cluster --capacity-providers FARGATE --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1
```

#### Step 3: Create CloudWatch Log Group
```bash
aws logs create-log-group --log-group-name /ecs/agroverse-backend
```

#### Step 4: Store Environment Variables in Parameter Store
```bash
# Store MONGO_URI securely
aws ssm put-parameter --name "/agroverse/mongo-uri" --value "mongodb+srv://agroverse:Agroverse%402004@agroverse.dveiewz.mongodb.net/?retryWrites=true&w=majority&appName=AgroVerse" --type "SecureString"

# Store JWT_SECRET securely
aws ssm put-parameter --name "/agroverse/jwt-secret" --value "qwertyuiop" --type "SecureString"
```

#### Step 5: Update and Register Task Definition
```bash
# Update ecs-task-definition.json with your account ID and ECR URI
# Then register the task definition
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json
```

#### Step 6: Create ECS Service
```bash
aws ecs create-service \
    --cluster agroverse-cluster \
    --service-name agroverse-backend-service \
    --task-definition agroverse-backend:1 \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-12345678],securityGroups=[sg-12345678],assignPublicIp=ENABLED}"
```

### Option 3: EC2 with Docker (Manual deployment)

**Best for:** Full control over the environment

#### Step 1: Launch EC2 Instance
```bash
# Launch Ubuntu instance (replace with your key pair and security group)
aws ec2 run-instances \
    --image-id ami-0c02fb55956c7d316 \
    --count 1 \
    --instance-type t3.micro \
    --key-name your-key-pair \
    --security-group-ids sg-your-security-group
```

#### Step 2: Connect to Instance
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

#### Step 3: Install Docker on EC2
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

#### Step 4: Deploy Application
```bash
# Clone your repository
git clone https://github.com/your-username/agroverse-backend.git
cd agroverse-backend

# Create .env file
echo "MONGO_URI=mongodb+srv://agroverse:Agroverse%402004@agroverse.dveiewz.mongodb.net/?retryWrites=true&w=majority&appName=AgroVerse" > .env
echo "JWT_SECRET=qwertyuiop" >> .env
echo "NODE_ENV=production" >> .env
echo "PORT=5000" >> .env

# Build and run with Docker Compose
docker-compose up -d
```

## Load Balancer and Domain Setup

### Application Load Balancer (ALB)
```bash
# Create target group
aws elbv2 create-target-group \
    --name agroverse-targets \
    --protocol HTTP \
    --port 5000 \
    --vpc-id vpc-12345678 \
    --health-check-path /api/auth/health

# Create load balancer
aws elbv2 create-load-balancer \
    --name agroverse-alb \
    --subnets subnet-12345678 subnet-87654321 \
    --security-groups sg-12345678
```

### SSL Certificate (Optional)
```bash
# Request SSL certificate
aws acm request-certificate \
    --domain-name api.yourdomain.com \
    --validation-method DNS
```

## Monitoring and Maintenance

### CloudWatch Alarms
```bash
# CPU utilization alarm
aws cloudwatch put-metric-alarm \
    --alarm-name "agroverse-high-cpu" \
    --alarm-description "Alarm when CPU exceeds 70%" \
    --metric-name CPUUtilization \
    --namespace AWS/ECS \
    --statistic Average \
    --period 300 \
    --threshold 70.0 \
    --comparison-operator GreaterThanThreshold \
    --evaluation-periods 2
```

### Backup Strategy
1. **Database**: MongoDB Atlas provides automatic backups
2. **Uploads**: Use S3 for file storage with versioning enabled
3. **Code**: Keep in version control (GitHub/GitLab)

## Scaling

### Auto Scaling (ECS)
```bash
# Create scaling policy
aws application-autoscaling register-scalable-target \
    --service-namespace ecs \
    --scalable-dimension ecs:service:DesiredCount \
    --resource-id service/agroverse-cluster/agroverse-backend-service \
    --min-capacity 1 \
    --max-capacity 10
```

## Cost Optimization

1. **Use t3.micro** for development/testing (free tier eligible)
2. **Enable detailed billing** to monitor costs
3. **Use Spot Instances** for non-critical workloads
4. **Set up billing alerts**
5. **Use Reserved Instances** for predictable workloads

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Implement proper IAM roles and policies
- [ ] Store secrets in AWS Systems Manager Parameter Store
- [ ] Enable CloudTrail for audit logging
- [ ] Configure security groups with minimal required access
- [ ] Regular security updates for dependencies
- [ ] Implement rate limiting and DDoS protection

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure your application listens on the correct port
2. **Database connection**: Check MongoDB Atlas whitelist and connection string
3. **Environment variables**: Verify all required variables are set
4. **File uploads**: Configure persistent storage for uploads folder
5. **CORS issues**: Update CORS settings for your frontend domain

### Logs Access
```bash
# Elastic Beanstalk logs
eb logs

# ECS logs
aws logs get-log-events --log-group-name /ecs/agroverse-backend --log-stream-name [stream-name]

# EC2 logs
sudo docker logs [container-id]
```

## Next Steps

1. **Test your deployment** with all API endpoints
2. **Set up monitoring** and alerting
3. **Configure backup strategy**
4. **Plan for auto-scaling**
5. **Implement CI/CD pipeline**
6. **Set up custom domain** with SSL certificate

## Support

For issues with this deployment:
1. Check AWS CloudWatch logs
2. Verify environment variables
3. Test database connectivity
4. Check security group settings
5. Review IAM permissions