import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

export interface CertificateStackProps extends StackProps {
  domainName: string;
  createCertificate?: boolean;
}

export class CertificateStack extends Stack {
  public readonly certificate: acm.ICertificate | undefined;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    if (props.createCertificate) {
      // Create new certificate
      this.certificate = new acm.Certificate(this, 'Certificate', {
        domainName: props.domainName,
        subjectAlternativeNames: [`www.${props.domainName}`],
        validation: acm.CertificateValidation.fromDns(),
      });
      
      new CfnOutput(this, 'NewCertificateArn', {
        value: this.certificate.certificateArn,
        description: 'Certificate ARN - Save this for future deployments',
        exportName: `${this.stackName}-CertificateArn`,
      });
      
      new CfnOutput(this, 'CertificateDomainValidation', {
        value: `Please complete DNS validation for ${props.domainName}`,
        description: 'Complete DNS validation in ACM console',
      });
    }
  }
}