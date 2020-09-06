# Azure Start, Stop VM

This Static WebSite can be deployed to Azure Static Website https://azure.microsoft.com/pl-pl/services/app-service/static/

This project allows you to:
1. List State of VM in particular Resource Group
2. StartVM
3. StopVM

# Deploying
Clone this Repository.
Make the following changes:

You need to create New Registration in Azure Active Directory - App registrations and add in Every Function (3 at this moment) - see /api and index.js
"SUBSCRIPTION_ID"
"Application (client) ID"
"Client secret"
"Directory (tenant) ID"


Please set your password also:
'StaticPassword';


Deploy as an Azure Static Website

# ToDo

Azure Active Directory Authentication
Use Managed Identity 