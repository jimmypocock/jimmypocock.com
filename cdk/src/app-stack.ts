import { Stack, StackProps, CfnOutput, Fn, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as path from 'path';
import * as fs from 'fs';

export interface AppStackProps extends StackProps {
  websiteBucketName: string;
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    // Import bucket from name
    const websiteBucket = s3.Bucket.fromBucketName(this, 'ImportedWebsiteBucket', props.websiteBucketName);

    // Import distribution from CloudFormation exports
    const distributionId = Fn.importValue(`${this.stackName.replace('-App', '-CDN')}-DistributionId`);
    const distributionDomainName = Fn.importValue(`${this.stackName.replace('-App', '-CDN')}-DistributionDomainName`);
    
    const distribution = cloudfront.Distribution.fromDistributionAttributes(this, 'ImportedDistribution', {
      distributionId: distributionId,
      domainName: distributionDomainName,
    });

    // Deploy site contents to S3
    // The project root is always the parent of the cdk directory
    const cdkDir = path.resolve(__dirname.includes('/lib') ? path.join(__dirname, '../..') : path.join(__dirname, '..'));
    const projectRoot = path.dirname(cdkDir);
    const outPath = path.join(projectRoot, 'out');
    
    if (!fs.existsSync(outPath)) {
      throw new Error(`Build output not found at ${outPath}. Please run 'npm run build' first.`);
    }
    
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(outPath, {
        exclude: [
          'images/rae/**',  // Exclude Rae's images - managed separately via S3 sync
        ],
      })],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
      cacheControl: [
        s3deploy.CacheControl.setPublic(),
        s3deploy.CacheControl.maxAge(Duration.hours(1)),
        s3deploy.CacheControl.fromString('s-maxage=31536000'),
      ],
      prune: false,  // Don't prune - we manage images separately
      retainOnDelete: false,
    });

    // Outputs
    new CfnOutput(this, 'DeploymentComplete', {
      value: 'Application deployed successfully',
      description: 'Deployment status',
    });
  }
}