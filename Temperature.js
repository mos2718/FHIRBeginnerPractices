var bodyTemperature = {
    "resourceType": "Observation",
    "status": "final",
    "category": [{
        "coding": [{
            "system": "http://terminology.hl7.org/CodeSystem/observation-category",
            "code": "vital-signs",
            "display": "Vital Signs"
        }]
    }],
    "code": {
        "coding": [
            {
                "system": "http://loinc.org",
                "code": "8310-5",
                "display": "Body temperature"
            }
        ],
        "text": "Temperature"
    },
    "subject": {
        "reference": "Patient/example",
        "display":""
    },
    "issued": "2013-04-04T13:27:00",
    "valueQuantity": {
        "value": 0,
        "unit": "degrees C",
        "system": "http://unitsofmeasure.org",
        "code": "Cel"
    },
    "bodySite": {
        "coding": [{
            "system": "http://snomed.info/sct",
            "code": "52795006",
            "display": "Forehead structure (body structure)"
        }]
    },
    "method": {
        "coding": [{
            "system": "http://snomed.info/sct",
            "code": "56342008",
            "display": "Temperature taking (procedure)"
        }]
    }
};

function currentTimeStamp() {
    var date = new Date();
    var timestamp = date.getUTCFullYear() + "-" + clamp(date.getMonth() + 1) + "-" + clamp(date.getUTCDate());
    timestamp = timestamp + "T" + clamp(date.getUTCDate()) + ":" + clamp(date.getUTCHours()) + ":" + clamp(date.getUTCMinutes()) + ":" + clamp(date.getUTCSeconds()) + ":00Z";
    // console.log(timestamp);
}

function clamp(value) {
    if (value < 10)
        value = "0" + value;
    return value;
}

function updateResource() {
    console.log("updating resource, please wait...");
    var interpretation = ["H", "N"];
    bodyTemperature.valueQuantity.value = parseFloat(document.getElementById("bodyTemperature").value);
    console.log(bodyTemperature.valueQuantity.value + typeof bodyTemperature.valueQuantity.value);
    console.log(bodyTemperature.referenceRange[0].high.value + typeof bodyTemperature.referenceRange[0].high.value);
    bodyTemperature.subject.reference += document.getElementById("id").value;
    bodyTemperature.subject.display = document.getElementById("name").value;
    bodyTemperature.issued = currentTimeStamp();
    if (bodyTemperature.valueQuantity.value > bodyTemperature.referenceRange[0].high.value) {
        bodyTemperature.interpretation[0].coding[0].code = "H";
        console.log("xxx");
    } else {
        bodyTemperature.interpretation[0].code = "N";
        console.log("yyy");
    }

    var data = JSON.stringify(bodyTemperature);
    var url = "http://hapi.fhir.org/baseR4/Observation";
    HTTPPostData(url, data);
}