const express = require("express");
const router = express.Router();
const caseController = require("../controllers/casesController");

/**
 * @swagger
 * /v1:
 *   post:
 *     summary: Create a basic case form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The request payload to create a basic case form.
 *             example:
 *               patientId: "ffff"
 *               staffId: "P23456"
 *               caseId: "TFLIRM"
 *               patientDetails: 
 *                 name: "eee"
 *                 patientId: "ffff"
 *                 hospitalId: "H78901"
 *                 DOB: "1980-05-15"
 *                 nationalId: "NID123456789"
 *                 age: 44
 *                 sex: "Male"
 *               primaryDoctorName: "www"
 *               primaryDoctorCode: "DOC6789"
 *               bedNumber: "B12"
 *               arrivalDate: "2024-06-11T14:30:00Z"
 *               preHospitalAssessment: "verbal"
 *               condition: "alert"
 *               mode: 
 *                 source: "ambulatory/self"
 *                 badge: ""
 *               weight: 
 *                 value: 70
 *                 measured: true
 *                 estimated: false
 *               height: 
 *                 value: 175
 *                 measured: true
 *                 estimated: false
 *               arrivalVitalSigns: 
 *                 pulse: 72
 *                 bp: "120/80"
 *                 o2: "98%"
 *                 rr: 16
 *                 spo2: 98
 *                 temp: 36.7
 *                 gcs: 15
 *                 painScore: 2
 *               complaints: 
 *                 - "chest pain"
 *                 - "shortness of breath"
 *               hopi: "Patient experienced sudden onset of chest pain and shortness of breath while at home."
 *               pastHistory: "Hypertension, Type 2 Diabetes"
 *               familyHistory: "Father had coronary artery disease"
 *               medicationHistory: 
 *                 - "Metformin"
 *                 - "Lisinopril"
 *               gpe: "General physical examination shows mild distress, alert and oriented."
 *               primarySystem: "Cardiovascular"
 *               otherSystem: "Respiratory"
 *               vitalSigns: 
 *                 pulse: 72
 *                 bp: "120/80"
 *                 o2: "98%"
 *                 rr: 16
 *                 spo2: 98
 *                 temp: 36.7
 *                 gcs: 15
 *                 painScore: 2
 *               workingDiagnosis: 
 *                 "1": ""
 *                 "2": ""
 *                 DD: ""
 *               urgentCare: 
 *                 - "Oxygen therapy"
 *                 - "Aspirin administration"
 *               investigations: 
 *                 - "ECG"
 *                 - "Troponin levels"
 *                 - "Chest X-ray"
 *               specialistReferrals: 
 *                 - "Cardiologist"
 *               treatments: "Oxygen therapy, Aspirin, Nitroglycerin"
 *               diagnosis: 
 *                 finalDiagnosis: 
 *                   - "Myocardial Infarction"
 *                 diagnosis: "admission"
 *               prescription: "Aspirin 81mg daily, Nitroglycerin as needed"
 *               followUp: "Follow up with cardiology in 1 week"
 *               returnToEr: "If chest pain recurs, or if shortness of breath worsens"
 *     responses:
 *       200:
 *         description: Successfully created and updated basic case form
 */
router.post("/v1", caseController.createBasicCaseForm);

/**
 * @swagger
 * /v1:
 *   put:
 *     summary: Update a basic case form
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("/v1", caseController.updateBasicCaseForm);


/**
 * @swagger
 * /v1/cardiac:
 *   post:
 *     summary: Create or update a cardiac case form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "P12342"
 *               caseId:
 *                 type: string
 *                 example: "BGDYIG"
 *               staffId:
 *                 type: string
 *                 example: "P23456"
 *               timeOfOnset:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-11T10:00:00Z"
 *               timeOfMaxPain:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-11T10:30:00Z"
 *               location:
 *                 type: string
 *                 example: "Central chest"
 *               timing:
 *                 type: string
 *                 example: "Sudden onset, lasting 30 minutes"
 *               radiation:
 *                 type: string
 *                 example: "Left arm and jaw"
 *               associated:
 *                 type: string
 *                 example: "Nausea, sweating"
 *               notes:
 *                 type: string
 *                 example: "Patient was at rest when the pain started, no previous episodes."
 *               riskFactors:
 *                 type: array
 *                 items:
 *                   type: string
 *               specialMedicationHistory:
 *                 type: array
 *                 items:
 *                   type: string
 *               ecg:
 *                 type: string
 *                 example: "ST-elevation in leads II, III, aVF"
 *               cardiacEnzymes:
 *                 type: string
 *                 example: "Elevated troponin levels"
 *               others:
 *                 type: string
 *                 example: "Chest X-ray showed no abnormalities"
 *     responses:
 *       200:
 *         description: Successfully created or updated
 */
router.post("/v1/cardiac", caseController.createCardiacCaseForm);

/**
 * @swagger
 * /v1/neonatal:
 *   post:
 *     summary: Create or update a neonatal case form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "P67890"
 *               caseId:
 *                 type: string
 *                 example: "VPW1TsI"
 *               staffId:
 *                 type: string
 *                 example: "P23456"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-11T00:00:00Z"
 *               time:
 *                 type: string
 *                 example: "14:30"
 *               birthWeight:
 *                 type: number
 *                 example: 3.2
 *               modeOfDelivery:
 *                 type: string
 *                 example: "Caesarean Section"
 *               indication:
 *                 type: string
 *                 example: "Fetal distress"
 *               gestation:
 *                 type: string
 *                 example: "38 weeks"
 *               apgar:
 *                 type: string
 *                 example: "8,9"
 *               antenatalSteroid:
 *                 type: boolean
 *                 example: true
 *               maternalBloodGroup:
 *                 type: string
 *                 example: "O+"
 *               babyBloodGroup:
 *                 type: string
 *                 example: "A+"
 *               babyG6PD:
 *                 type: string
 *                 example: "Normal"
 *               resuscitation:
 *                 type: string
 *                 example: "None required"
 *               feeding:
 *                 type: string
 *                 example: ""
 *               hopi:
 *                 type: string
 *                 example: "Newborn delivered via Caesarean section at 38 weeks gestation due to fetal distress. Apgar scores were 8 and 9 at 1 and 5 minutes respectively. Antenatal steroids were administered."
 *     responses:
 *       200:
 *         description: Successfully created or updated neonatal case form
 */
router.post("/v1/neonatal", caseController.createNeonatalCaseForm);




/**
 * @swagger
 * /v1/obstetric:
 *   post:
 *     summary: Create or update an obstetric case form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "12345"
 *               caseId:
 *                 type: string
 *                 example: "5RUHU3"
 *               staffId:
 *                 type: string
 *                 example: "P23456"
 *               lmp:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T00:00:00.000Z"
 *               membranes:
 *                 type: object
 *                 properties:
 *                   ruptured:
 *                     type: boolean
 *                     example: true
 *                   intact:
 *                     type: boolean
 *                     example: false
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-01T00:00:00.000Z"
 *                   startTime:
 *                     type: string
 *                     example: "14:30"
 *               obstetricSummary:
 *                 type: object
 *                 properties:
 *                   g:
 *                     type: string
 *                     example: "3"
 *                   p:
 *                     type: string
 *                     example: "1"
 *                   l:
 *                     type: string
 *                     example: "1"
 *                   a:
 *                     type: string
 *                     example: "1"
 *                   s:
 *                     type: string
 *                     example: "0"
 *                   d:
 *                     type: string
 *                     example: "0"
 *                   less:
 *                     type: string
 *                     example: "0"
 *                   ectopic:
 *                     type: string
 *                     example: "0"
 *               plurality:
 *                 type: string
 *                 example: "Single"
 *               edd:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-01T00:00:00.000Z"
 *               gestationScans:
 *                 type: object
 *                 properties:
 *                   weeks:
 *                     type: string
 *                     example: "20"
 *                   days:
 *                     type: string
 *                     example: "2"
 *               gestationDates:
 *                 type: object
 *                 properties:
 *                   weeks:
 *                     type: string
 *                     example: "19"
 *                   days:
 *                     type: string
 *                     example: "5"
 *               patientBloodGroup:
 *                 type: string
 *                 example: "O+"
 *               fetalHeartRate:
 *                 type: string
 *                 example: "140 bpm"
 *               twinsHeartRate:
 *                 type: string
 *                 example: ""
 *               riskFactorsMaternal:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["asdasd"]
 *               riskFactorsFetal:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["asdasdas"]
 *               hopi:
 *                 type: string
 *                 example: "Patient reports regular fetal movements and no complications."
 *     responses:
 *       200:
 *         description: Successfully created or updated
 */
router.post("/v1/obstetric", caseController.createObstetricCaseForm);

/**
 * @swagger
 * /v1/stroke:
 *   post:
 *     summary: Create or update a stroke case form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "P789012"
 *               caseId:
 *                 type: string
 *                 example: "VPWss1TI"
 *               staffId:
 *                 type: string
 *                 example: "P23456"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-11T00:00:00Z"
 *               unknownTimeOfOnSet:
 *                 type: boolean
 *                 example: false
 *               timeElapsed:
 *                 type: string
 *                 example: "2 hours"
 *               GBRS:
 *                 type: string
 *                 example: "Moderate"
 *               preMorbidIndependent:
 *                 type: boolean
 *                 example: true
 *               syncope:
 *                 type: object
 *                 properties:
 *                   yes:
 *                     type: string
 *                     example: ""
 *                   no:
 *                     type: string
 *                     example: ""
 *               seizure:
 *                 type: object
 *                 properties:
 *                   yes:
 *                     type: string
 *                     example: ""
 *                   no:
 *                     type: string
 *                     example: ""
 *               faceWeakNess:
 *                 type: object
 *                 properties:
 *                   yes:
 *                     type: string
 *                     example: ""
 *                   no:
 *                     type: string
 *                     example: ""
 *               armWeakNess:
 *                 type: object
 *                 properties:
 *                   yes:
 *                     type: string
 *                     example: ""
 *                   no:
 *                     type: string
 *                     example: ""
 *               speechDisturbance:
 *                 type: object
 *                 properties:
 *                   yes:
 *                     type: string
 *                     example: ""
 *                   no:
 *                     type: string
 *                     example: ""
 *               visualLoss:
 *                 type: object
 *                 properties:
 *                   yes:
 *                     type: string
 *                     example: ""
 *                   no:
 *                     type: string
 *                     example: ""
 *               legWeakNess:
 *                 type: object
 *                 properties:
 *                   yes:
 *                     type: string
 *                     example: ""
 *                   no:
 *                     type: string
 *                     example: ""
 *               total:
 *                 type: integer
 *                 example: 100
 *               notes:
 *                 type: string
 *                 example: "Patient presented with sudden onset of facial weakness, arm weakness, and speech disturbance. Symptoms began approximately 2 hours prior to arrival. History of syncope. Pre-morbidly independent."
 *     responses:
 *       200:
 *         description: Successfully created or updated
 */
router.post("/v1/stroke", caseController.createStrokeCaseForm);


/**
 * @swagger
 * /v1/management:
 *   post:
 *     summary: Create or update a management form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "P23456"
 *               caseId:
 *                 type: string
 *                 example: "BGDYIG"
 *               staffId:
 *                 type: string
 *                 example: "P23456"
 *               formId:
 *                 type: string
 *                 example: "C1KBR3"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-11T00:00:00Z"
 *               time:
 *                 type: string
 *                 example: "14:30"
 *               seenBy:
 *                 type: string
 *                 example: "Dr. Jane ajith"
 *               issues:
 *                 type: string
 *                 example: "Patient reports severe abdominal pain and nausea."
 *               findings:
 *                 type: string
 *                 example: "Tenderness in the lower right quadrant, elevated WBC count."
 *               investigations:
 *                 type: string
 *                 example: "Complete blood count, abdominal ultrasound."
 *               treatments:
 *                 type: string
 *                 example: "Administered IV fluids, prescribed pain medication."
 *     responses:
 *       200:
 *         description: Successfully created or updated
 */
router.post("/v1/management", caseController.createManagementForm);

/**
 * @swagger
 * /v1/followup:
 *   post:
 *     summary: Create or update a follow-up form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "P123456"
 *               caseId:
 *                 type: string
 *                 example: "BGDYIG"
 *               staffId:
 *                 type: string
 *                 example: "P23456"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-11T00:00:00Z"
 *               time:
 *                 type: string
 *                 example: "14:30"
 *               seenBy:
 *                 type: string
 *                 example: "Dr. Jane ajith"
 *               newIssues:
 *                 type: string
 *                 example: "Patient developed a rash and fever."
 *               reports:
 *                 type: string
 *                 example: "Lab results indicate a possible infection."
 *               investigations:
 *                 type: string
 *                 example: "Blood culture, skin biopsy."
 *               treatments:
 *                 type: string
 *                 example: "Started on antibiotics, topical ointment for rash."
 *     responses:
 *       200:
 *         description: Successfully created or updated
 */
router.post("/v1/followup", caseController.createFollowUpForm);


/**
 * @swagger
 * /v1/list:
 *   post:
 *     summary: Fetch all forms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 example: 0
 *               searchQuery:
 *                 type: string
 *                 example: ""
 *               type:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Successfully fetched all forms
 */
router.post("/v1/list", caseController.getAllForms);


/**
 * @swagger
 * /v1/{caseId}:
 *   get:
 *     summary: Get form details using caseId
 *     parameters:
 *       - in: path
 *         name: caseId
 *         required: true
 *         description: ID of the case
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         required: true
 *         description: Type of the form
 *         schema:
 *           type: string
 *       - in: query
 *         name: formId
 *         required: false
 *         description: ID of the form
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched form details
 */
router.get("/v1/:caseId", caseController.getFormDetails);


/**
 * @swagger
 * /v1/summary/{caseId}:
 *   get:
 *     summary: Fetch summary page details using caseId
 *     parameters:
 *       - in: path
 *         name: caseId
 *         required: true
 *         description: ID of the case
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched summary details
 */
router.get("/v1/summary/:caseId", caseController.getSummaryDetails);

module.exports = router;
