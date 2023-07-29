import React from "react";
import { Form, Input, Button, Divider } from "antd";
import "./App.css";

const FrontEnd = () => {
  // Sample API form data (replace with your actual data after fetching)
  const formData = 
    {
      "contractId": 1,
      "customerName": "Groupe D.T.P.",
      "customerSector": "Compte privé",
      "customerSegment": "Industrie",
      "contractCategoryId": 1,
      "contractCategoryDesignation": "BI ON PREM",
      "tenantID": 55,
      "contractAmount": 0.0,
      "remoteId": 14,
      "title": "1159-DTP-Cube DTP 2017",
      "deliveryAmount": 0.0000,
      "upperLimit": "0",
      "beginDate": "01/05/2017",
      "endDate": "31/05/2018",
      "billingDate": "01/05/2017",
      "companyId": 1,
      "companyName": "BIAL-X",
      "businessUnit": 66,
      "businessUnitName": 7,
      "customerId": 451,
      "contactCustomerId": 12,
      "contactCustomerIds": 123,
      "billingMode": 2,
      "billingModeName": "Flat-price contract",
      "billingPlanning": 1,
      "billingPlanningName": "Manual invoicing terms",
      "projectId": 321,
      "projectName": 34,
      "description": 23,
      "status": 2,
      "statusName": "Closed",
      "profitCenter": "Disabled Setting",
      "remark": 324234,
      "orderNumber": "365",
      "contractNumber": "1159",
      "contractTypeId": 6,
      "contractTypeName": "Cube",
      "expensesFlatRate": 0.0,
      "billableExpenses": false,
      "contractCurrency": "€",
      "contractCreator": "Eric FEREY",
      "affectedCommercialsList": [
          {
              "employeeId": 8,
              "fullName": "Matthieu BOUCHET",
              "missionId": 1,
              "beginDate": "01/05/2017",
              "endDate": "31/05/2018"
          }
      ],
      "affectedProjectManagerList": [
          {
              "employeeId": 29,
              "fullName": "Pierre-Olivier POETE",
              "missionId": 1,
              "beginDate": "01/05/2017",
              "endDate": "07/05/2018"
          }
      ],
      "affectedAdministrativeOfficers": [],
      "coContractorList": [],
      "projectTypeId": 243,
      "projectTypeName": 234,
      "projectNumber": 45,
      "projectProfitCenter": 545,
      "proprieteOnDemand": [
          {
              "type": "EDIT_TEXT",
              "value": 2342,
              "id": "zone_13_key_P_172-S_1",
              "designation": "ATTENTION"
          },
          {
              "type": "EDIT_TEXT",
              "value": 232,
              "id": "zone_13_key_P_129",
              "designation": "COMMENTAIRES"
          },
          {
              "type": "INPUT_TEXT",
              "value": 647,
              "id": "zone_13_key_P_1",
              "designation": "COMMENTAIRES"
          }
      ],
      "commercialStatusID": 5,
      "commercialStatusLevel": 100.0,
      "quoteAmount": 0.0,
      "planningAmount": 0.0,
      "deliverablesAmount": 0.0,
      "payedAmount": 165.0,
      "billedAmount": 165.0,
      "unplannedBalance": -165.0
  
  };

  // Function to render the form fields recursively
  const renderFormFields = (dataObject, parentKey = "") => {
    const formFields = [];
    for (const [key, value] of Object.entries(dataObject)) {
      const fieldKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === "object" && !Array.isArray(value)) {
        formFields.push(...renderFormFields(value, fieldKey));
      } else {
        formFields.push(
          <Form.Item label={fieldKey} name={fieldKey} key={fieldKey} initialValue={value}>
            <Input disabled />
          </Form.Item>
          
        );
      }
    }
    return formFields;
  };

  return (
    <div>
      <h1>Contract Form</h1>
      <Divider />

      <Form layout="vertical">
        {renderFormFields(formData)}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        
      </Form>
    </div>
  );
};

export default FrontEnd;
