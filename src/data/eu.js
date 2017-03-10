data.eu = {
  "status": {
    "citizen": {
      "name": {
        "en": "Citizenship"
      },
      "rights": null
    },
    "permanent": {
      "name": {
        "en": "Permanent Residence"
      },
      "rights": null
    },
    "tourist_visa_exempted": {
      "rights": null
    },
    "alien": null
  },
  "transitions": {
    "eu_member_citizenship": {
      "type": "automatic",
      "name": {
        "en": "EU Member Citizenship"
      },
      "from": [
        "uk citizen"
      ],
      "to": "eu citizen"
    }
  }
}
