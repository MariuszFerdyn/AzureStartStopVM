//npm i util ms-rest-azure azure-arm-compute
const util = require('util');
const msRestAzure = require('ms-rest-azure');
const ComputeManagementClient = require('azure-arm-compute');
const SUBSCRIPTION_ID = "SUBSCRIPTION_ID";
const CLIENT_ID = "Application (client) ID";
const SECRET_KEY = "Client secret";
const DOMAIN = "Directory (tenant) ID";
const SECRET_CODE = 'StaticPassword';


module.exports = async function(context, req) {
    context.log('\n>>>>>>>JavaScript HTTP trigger function processed a request.');
    try {
        console.log('\n>>>>>>>Trying to log to Azure....');
        const validationCode = (req.query.code || (req.body && req.body.code));
        const resourceGroupName = (req.query.RG || (req.body && req.body.RG));
        const vmName = (req.query.VM || (req.body && req.body.VM));
        if (validationCode !== SECRET_CODE) {
            throw new Error('Wrong code...');
        }
        const credentials = await msRestAzure.loginWithServicePrincipalSecret(CLIENT_ID, SECRET_KEY, DOMAIN);
        if (!credentials) {
            throw new Error('Wrong Credentials.')
        }
        console.log('\n>>>>>>>Azure Logged In....');
        const computeClient = new ComputeManagementClient(credentials, SUBSCRIPTION_ID);
        const virtualMachine = await computeClient.virtualMachines.start(resourceGroupName, vmName);
        console.log('\n>>>>>>>Azure Job Done....');

        context.res = {
            body: {
                message: 'All the operations have completed successfully. The final set of results are as follows:',
                result: virtualMachine
            }
        };
    } catch (err) {
        console.log(err);
        context.res = {
            status: 500,
            body: String(err)
        };
    }
}

