import { Box, FormControl, Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography, FormGroup, Autocomplete } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Select from '@mui/material/Select';
import Sidebar from '../../components/sidebar/sidebar';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DoneIcon from '@mui/icons-material/Done';
import { cfpBaseUrl, billingAPIUrl } from '../../network/urls';
import AddApplicationsUpdateLocalStorage from './updateLocalStorageOnNewConnSubmission';
import CircularProgress from '@mui/material/CircularProgress';

import "./NewConnectionForm.scss";

const NewConnectionForm = () => {
  const initialValues = {
    // Classification group Initial Values
    iv_connection_type: 'Domestic',
    iv_applied_load: '',
    iv_near_by_reference_no: '',
    iv_circle: '',
    iv_division: '',
    iv_sub_divison: '',
    iv_type_of_application: '',
    // Applicant Details group Initial Values
    iv_applicant_status: 'Owner',
    iv_applicant_name: '',
    iv_applicant_citizenship: 'Pakistani',
    iv_applicant_cnic: '',
    iv_applicant_phone_no: '',
    iv_applicant_email: '',
    iv_ntn: '',
    iv_strn: '',
    // Owner Details group Initial Values
    iv_owner_name: '',
    iv_owner_cnic: '',
    iv_owner_phone_no: '',
    iv_owner_email: '',
    // Address Group Initial Values
    iv_area_type: 'Urban',
    iv_city_district: '',
    iv_meter_installed: 0,
    iv_town_tehsil: '',
    iv_chak_street: '',
    // Urban
    iv_house: '',
    iv_street: '',
    iv_sector_block_phase_mohala: '',
    // Rural 
    iv_chak_street: '',
    iv_village: '',
    // Required Documents Initial Values
    iv_applicant_cnic_document: null,
    iv_property_documents: null,
    iv_near_by_bill: null,
    iv_owner_cnic_document: null,
    iv_noc_owner: null,
    iv_resolution: null,
    iv_memo: null,
    iv_form29initial: null,
  }
  const [isLoading, setIsLoading] = React.useState(false);
  // Classification Group States
  const [connectionType, setConnectionType] = useState('Domestic');
  const [nearByReferenceNumber, setNearByReferenceNumber] = useState('');
  const [nearByName, setNearByName] = useState('');
  const [nearByAddress, setNearByAddress] = useState('');
  const [subDivision, setSubDivision] = React.useState({ code: null, name: '' });
  // Applicants Details States 
  const [applicantStatus, setApplicantStatus] = useState('Owner');
  const [applicantCitizenship, setApplicantCitizenship] = useState('Pakistani');
  // Address States
  const [areaType, setAreaType] = useState('Urban');

  // Documents states
  const [applicantCnicDocument, setApplicantCnicDocument] = useState('');
  const [propertyDocuments, setPropertDocuments] = useState('');
  const [nearByBillDocument, setNearByBillDocument] = useState('');
  const [nocOwnerDocument, setNocOwnerDocument] = useState('');
  const [ownerCnicDocument, setOwnerCnicDocument] = useState('');
  const [resolutionDocument, setResolutionDocument] = useState('');
  const [memorandumDocument, setMemorandumDocument] = useState('');
  const [form29Document, setForm29Document] = useState('');

  // Thumbnail states
  const [applicantCnicDocumentThumbnail, setApplicantCnicDocumentThumbnail] = useState('');
  const [propertyDocumentsThumbnail, setPropertyDocumentsThumbnail] = useState('');
  const [nearByBillDocumentThumbnail, setNearByBillDocumentThumbnail] = useState('');
  const [nocOwnerDocumentThumbnail, setNocOwnerDocumentThumbnail] = useState('');
  const [ownerCnicDocumentThumbnail, setOwnerCnicDocumentThumbnail] = useState('');
  const [resolutionDocumentThumbnail, setResolutionDocumentThumbnail] = useState('');
  const [memorandumDocumentThumbnail, setMemorandumDocumentThumbnail] = useState('');
  const [form29DocumentThumbnail, setForm29DocumentThumbnail] = useState('');

  // Base64 to submit
  const [propertyDocumentsBase64, setPropertyDocumentsBase64] = useState('')
  const [copyOfApplicantCNICBase64, setCopyOfApplicantCNICBase64] = useState('')
  const [nearByBillDocumentBase64, setNearByBillDocumentBase64] = useState('')
  const [resolutionDocumentBase64, setResolutionDocumentBase64] = useState('')
  const [memorandumDocumentBase64, setMemorandumDocumentBase64] = useState('')
  const [form29DocumentBase64, setForm29DocumentBase64] = useState('')
  const [ownerNOCBase64, setOwnerNOCBase64] = useState('')
  const [ownerCNICBase64, setOwnerCNICBase64] = useState('')

  // Terms and conditions
  const [termCondition, setTermCondition] = useState(true);
  // States for hiding conditional fields
  const [showHide, setShowHide] = useState();
  const [ownerCNICAttachment, setownerCNICAttachment] = useState();
  const [nocAttachment, setNocAttachment] = useState();
  const [citiesLists, setCitiesLists] = useState([]);
  const [hierarchyList, setHierarchyList] = useState([]);
  // const [companyList, setCompanyList] = useState([
  //   { code: 11, name: 'LESCO' },
  //   { code: 12, name: 'GEPCO' },
  //   { code: 13, name: 'FESCO' },
  //   { code: 14, name: 'IESCO' },
  //   { code: 15, name: 'MEPCO' },
  //   { code: 26, name: 'PESCO' },
  //   { code: 37, name: 'HESCO' },
  //   { code: 38, name: 'SEPCO' },
  //   { code: 48, name: 'QESCO' },
  //   { code: 59, name: 'TESCO' }
  // ]);
  const [circleList, setCircleList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [subDivisionList, setSubDivisionList] = useState([]);
  const [companyCode, setCompanyCode] = useState();
  const [circleCode, setCircleCode] = useState();
  const [defaultCircle, setDefaultCircle] = useState();
  const [divisionCode, setDivisionCode] = useState();
  const [defaultDivision, setDefaultDivision] = useState();
  const [subDivisionCode, setSubDivisionCode] = useState();
  // Defining ref for sticky notes
  const exportRef = useRef();

  const connectionTypeOptionsForValidation = ['Domestic', 'Commercial', 'Industrial', 'Agriculture', 'Tubewell', 'Temporary', 'General Services', 'Electrification', 'Street Light', 'Corporate Company'];
  const applicantStatusForValidation = ['Owner', 'Tenant'];
  const applicantCitizenshipForValidation = ['Pakistani', 'Foreigner'];
  const areaTypeForValidation = ['Urban', 'Rural'];

  const token = JSON.parse(window.localStorage.getItem('user-token'));
  let userCode = JSON.parse(window.localStorage.getItem("user-office-code"));
  let userCompany = userCode.slice(0, 2);
  let userCircle = userCode.slice(0, 3);
  let userDivision = userCode.slice(0, 4);

  // Formik form submission and new connection API calling
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: Yup.object().shape({
        // Classification group Validations
        iv_connection_type: Yup.mixed().required("Please select connection type.").oneOf(connectionTypeOptionsForValidation, 'Please select a valid option'),
        iv_applied_load: Yup.number().max(1000, "Applied load can not be more than 1000kW.").required("Please enter applied load."),
        iv_near_by_reference_no: Yup.string().min(14, "Please enter 14 digit reference number.").max(14, "Please enter 14 digit reference number.").matches(/^[0-9]+$/, "Enter 14 digit reference number as 01234567891234").optional(),
        iv_circle: Yup.mixed().required("Please select a circle."),
        iv_division: Yup.mixed().required("Please select a division."),
        iv_sub_divison: Yup.mixed().required("Please select a sub division."),
        // Applicant Details group Validations
        iv_applicant_status: Yup.mixed().required("Please select applicant status.").oneOf(applicantStatusForValidation, 'Please select a valid option'),
        iv_applicant_name: Yup.string().min(3, "Name should be atleast 3 characters.").max(30, "Name should be less than 30 characters.").required("Please enter applicant name."),
        iv_applicant_cnic: Yup.string().min(13, "Please enter 13 digit CNIC.").max(13, "Please enter 13 digit CNIC.").required("Please enter valid CNIC number.").matches(/^[0-9]+$/, "Enter CNIC number as 3520212345678."),
        iv_applicant_citizenship: Yup.mixed().required("Please select citizenship.").oneOf(applicantCitizenshipForValidation, 'Please select a valid option'),
        iv_applicant_phone_no: Yup.string().max(11, "Please enter 11 digit phone number.").min(11, "Please enter 11 digit phone number.").required("Please enter valid mobile number.").matches(/^03[0-9]{2}[0-9]{7}$/, "Enter Phone number as 03001234567"),
        iv_applicant_email: Yup.string().email("Enter email as 'john@gmail.com'.").notRequired(),
        // NTN
        iv_ntn: Yup.string().when('iv_connection_type', {
          is: (iv_connection_type) => (iv_connection_type === "Industrial" || iv_connection_type === "Commercial" || iv_connection_type === "Corporate Company"),
          then: Yup.string().required("Please enter valid NTN.").min(7, "NTN. should be atleast 7 digits.").max(13, "NTN. should be 13 digits."),
          otherwise: Yup.string().optional(),
        }),
        // STRN
        iv_strn: Yup.string().when('iv_connection_type', {
          is: (iv_connection_type) => iv_connection_type === "Industrial" || iv_connection_type === "Commercial" || iv_connection_type === "Corporate Company",
          then: Yup.string().required("Please enter valid STRN.").max(13, "STRN. should be 13 digits.").min(13, "STRN. should be 13 digits."),
          otherwise: Yup.string().optional(),
        }),
        // Owner Details group Validations
        // Owner Name
        iv_owner_name: Yup.string().when('iv_applicant_status', {
          is: (iv_applicant_status) => iv_applicant_status === 'Tenant',
          then: Yup.string().max(30).required("Please enter valid owner name."),
          otherwise: Yup.string()
        }),
        // Owner Cnic
        iv_owner_cnic: Yup.string().when('iv_applicant_status', {
          is: (iv_applicant_status) => iv_applicant_status === 'Tenant',
          then: Yup.string().min(13, "Please enter 13 digit CNIC.").max(13, "Please enter 13 digit CNIC.").required("Please enter valid CNIC number.").matches(/^[0-9]+$/, "Enter CNIC number as 3520212345678."),
          otherwise: Yup.string(),
        }),
        // Owner Phone No
        iv_owner_phone_no: Yup.string().when('iv_applicant_status', {
          is: (iv_applicant_status) => iv_applicant_status === 'Tenant',
          then: Yup.string().max(11, "Please enter 11 digit phone number.").min(11, "Please enter 11 digit phone number.").required("Please enter valid mobile number.").matches(/^03[0-9]{2}[0-9]{7}$/, "Enter Phone number as 03001234567"),
          otherwise: Yup.string(),
        }),
        // Owner Email
        iv_owner_email: Yup.string().when('iv_applicant_status', {
          is: (iv_applicant_status) => iv_applicant_status === 'Tenant',
          then: Yup.string().email("Enter email as 'john@gmail.com'.").optional(),
          otherwise: Yup.string(),
        }),
        // Address group Validations
        iv_area_type: Yup.mixed().required("Please select area type.").oneOf(areaTypeForValidation, 'Please select a valid option'),
        iv_meter_installed: Yup.number().required("Please enter no of meters already installed."),
        iv_city_district: Yup.string().required("Please select a city.").oneOf(citiesLists, 'Please select a valid option'),
        // Urban
        iv_house: Yup.string().when('iv_area_type', {
          is: (iv_area_type) => iv_area_type === 'Urban',
          then: Yup.string().max(20, "House must be less than 20 character").required("Enter house."),
          otherwise: Yup.string(),
        }),
        iv_street: Yup.string().when('iv_area_type', {
          is: (iv_area_type) => iv_area_type === 'Urban',
          then: Yup.string().max(25, "Street must be less than 25 character").required("Please enter street."),
          otherwise: Yup.string(),
        }),
        iv_sector_block_phase_mohala: Yup.string().when('iv_area_type', {
          is: (iv_area_type) => iv_area_type === 'Urban',
          then: Yup.string().max(20, "Sector/Block must be less than 20 character").required("Please enter sector/block."),
          otherwise: Yup.string(),
        }),
        iv_town_tehsil: Yup.string().max(20, "Town / Tehsil must be less than 20 character").required("Please enter town."),
        // Rural
        iv_chak_street: Yup.string().when('iv_area_type', {
          is: (iv_area_type) => iv_area_type === 'Rural',
          then: Yup.string().max(25, "Chak / Street must be less than 25 character").required("Please enter chak / street."),
          otherwise: Yup.string(),
        }),
        iv_village: Yup.string().when('iv_area_type', {
          is: (iv_area_type) => iv_area_type === 'Rural',
          then: Yup.string().max(25, "Village must be less than 25 character").required("Please enter village."),
          otherwise: Yup.string(),
        }),
        // Required Documents Validation
        iv_applicant_cnic_document: Yup.mixed().required('Please upload cnic in jpg, jpeg, png or pdf format.'),
        iv_property_documents: Yup.mixed().required('Please upload property documents in jpg, jpeg, png or pdf format.'),
        iv_near_by_bill: Yup.mixed().nullable().notRequired('Please upload near by electricity bill in jpg, jpeg, png or pdf format.'),
        iv_owner_cnic_document: Yup.mixed().when('iv_applicant_status', {
          is: (iv_applicant_status) => (iv_applicant_status === 'Tenant'),
          then: Yup.mixed().required('Please upload cnic in jpg, jpeg, png or pdf format.'),
          otherwise: Yup.mixed(),
        }),
        iv_noc_owner: Yup.mixed().when('iv_applicant_status', {
          is: (iv_applicant_status) => (iv_applicant_status === 'Tenant'),
          then: Yup.mixed().required('Please upload NoC in jpg, jpeg, png or pdf format.'),
          otherwise: Yup.mixed(),
        }),
        iv_resolution: Yup.mixed().when('iv_connection_type', {
          is: (iv_connection_type) => iv_connection_type === "Industrial",
          then: Yup.mixed().required("Please upload resolution form in jpg, jpeg, png or pdf format."),
          otherwise: Yup.mixed(),
        }),
        iv_memo: Yup.mixed().nullable().notRequired("Please upload MoA Certificate in jpg, jpeg, png or pdf format."),
        iv_form29initial: Yup.mixed().when('iv_connection_type', {
          is: (iv_connection_type) => iv_connection_type === "Industrial",
          then: Yup.mixed().required("Please upload Form 29 in jpg, jpeg, png or pdf format."),
          otherwise: Yup.mixed(),
        }),
      }),
      onSubmit: (values, { resetForm }) => {
        setIsLoading(true);
        // console.log('In Formik submitng form')
        var formdata = new FormData();
        formdata.append("createdBy", window.localStorage.getItem('user-name'));
        console.log(window.localStorage.getItem('user-name'));
        formdata.append("assignedTo", "");
        formdata.append("approvedBy", "");
        formdata.append("applicationStatusId", 1);
        formdata.append("lastModifiedBy", "");
        formdata.append("remarks", "");
        formdata.append("remarksDetail", "");
        formdata.append("isOnline", 1);
        formdata.append("submittedThrough", "CF Portal");
        formdata.append("subDivisionCode", subDivision.code);
        // formdata.append("subDivisionCode", values.iv_sub_divison);
        console.log(subDivision.code, "Sub Division");
        formdata.append("divisionCode", defaultDivision.code);
        console.log(defaultDivision.code, "Division");
        formdata.append("circleCode", defaultCircle.code);
        console.log(defaultCircle.code, "Circle");
        formdata.append("companyCode", parseInt(defaultCircle.code.toString().slice(0, 2)));
        console.log(parseInt(defaultCircle.code.toString().slice(0, 2)), "companyCode");
        formdata.append("withDrawlStatus", "");
        formdata.append("termAndConditionFlag", "yes");
        formdata.append("nearByReferenceNumber", nearByReferenceNumber);
        console.log(nearByReferenceNumber, '<--Near by reference number');
        formdata.append("nearByName", nearByName);
        console.log(nearByName, '<--Near by name')
        formdata.append("nearByAddress", nearByAddress);
        console.log(nearByAddress, '<--Near by address')
        formdata.append("connectionType", connectionType);
        console.log(connectionType, '<--conn type')
        formdata.append("applicantStatus", values.iv_applicant_status);
        console.log(values.iv_applicant_status, '<--app status')
        formdata.append("applicantName", values.iv_applicant_name);
        console.log(values.iv_applicant_name, '<--app name')
        formdata.append("applicantCNIC", values.iv_applicant_cnic);
        console.log(values.iv_applicant_cnic, '<--app cnic');
        formdata.append("applicantMobile", values.iv_applicant_phone_no);
        console.log(values.iv_applicant_phone_no, '<--app phone')
        formdata.append("applicantEmail", values.iv_applicant_email);
        console.log(values.iv_applicant_email, '<--app email')
        formdata.append("applicantCitizenship", values.iv_applicant_citizenship);
        console.log(values.iv_applicant_citizenship, '<--app citizenship')
        if (areaType === "Urban" || areaType === "urban") {
          formdata.append("premisesAddress", values.iv_house.concat(' ' + values.iv_street + ' ,' + values.iv_sector_block_phase_mohala + ' ,' + values.iv_town_tehsil + ' ,' + values.iv_city_district))
          console.log(values.iv_house.concat(' ' + values.iv_street + ' ,' + values.iv_sector_block_phase_mohala + ' ,' + values.iv_town_tehsil + ' ,' + values.iv_city_district), '<--Premises address')
        }
        if (areaType === "Rural" || areaType === "rural") {
          formdata.append("premisesAddress", values.iv_chak_street.concat(' ' + values.iv_village + ' ,' + values.iv_town_tehsil + ' ,' + values.iv_city_district))
          console.log(values.iv_chak_street.concat(' ' + values.iv_village + ' ,' + values.iv_town_tehsil + ' ,' + values.iv_city_district), '<--Premises address')
        }
        formdata.append("appliedLoad", values.iv_applied_load);
        console.log(values.iv_applied_load, '<--app load')
        if (values.iv_applicant_status === "Owner" || values.iv_applicant_status === "owner") {
          formdata.append("ownerName", values.iv_applicant_name);
          console.log("Owner Name", values.iv_applicant_name);
          formdata.append("ownerCNIC", values.iv_applicant_cnic);
          console.log("Owner Cnic", values.iv_applicant_cnic);
          formdata.append("ownerMobile", values.iv_applicant_phone_no);
          console.log("Owner Mobile", values.iv_applicant_phone_no);
          formdata.append("ownerEmail", values.iv_applicant_email);
          console.log("Owner Email", values.iv_applicant_email);
        }
        else if (values.iv_applicant_status === "Tenant" || values.iv_applicant_status === "tenant") {
          formdata.append("ownerName", values.iv_owner_name);
          console.log("Owner Name", values.iv_owner_name);
          formdata.append("ownerCNIC", values.iv_owner_cnic);
          console.log("Owner CNIC", values.iv_owner_cnic);
          formdata.append("ownerMobile", values.iv_owner_phone_no);
          console.log("Owner Phone", values.iv_owner_phone_no);
          formdata.append("ownerEmail", values.iv_owner_email);
          console.log("Owner Email", values.iv_owner_email);
        }
        formdata.append("noOfMetersAlreadyInstalled", values.iv_meter_installed);
        console.log(values.iv_meter_installed, '<--noOfMetersAlreadyInstalled')
        formdata.append("areaType", areaType);
        console.log(areaType, '<--area')
        formdata.append("houseNo", values.iv_house);
        console.log(values.iv_house, '<--house')
        formdata.append("streetNo", values.iv_street);
        console.log(values.iv_street, '<--street')
        formdata.append("sectorBlockPhaseMohalah", values.iv_sector_block_phase_mohala);
        // formdata.append("sectorBlockPhaseMohala", values.iv_sector_block_phase_mohala);
        console.log(values.iv_sector_block_phase_mohala, '<--sector')
        formdata.append("chakStreet", values.iv_chak_street);
        console.log(values.iv_chak_street, '<--chak street')
        formdata.append("village", values.iv_village);
        console.log(values.iv_village, '<--village');
        formdata.append("townTehsil", values.iv_town_tehsil);
        console.log(values.iv_town_tehsil, '<--town')
        formdata.append("cityDistrict", values.iv_city_district);
        console.log(values.iv_city_district, '<--city')
        formdata.append("NTN", values.iv_ntn);
        console.log(values.iv_ntn, '<--ntn')
        formdata.append("STRN", values.iv_strn);
        console.log(values.iv_strn, '<--strn')

        console.log("premisesDocument", propertyDocumentsThumbnail);
        console.log("copyOfApplicantCNIC", applicantCnicDocumentThumbnail);
        console.log("scannedCopyOfNearByElectricityBill", nearByBillDocumentThumbnail);
        console.log("resolutionFormDesc", resolutionDocumentThumbnail);
        console.log("certMemoDesc", memorandumDocumentThumbnail);
        console.log("certFormDesc", form29DocumentThumbnail);
        console.log("ownerNOC", nocOwnerDocumentThumbnail);
        console.log("copyOfOwnerCNIC", ownerCnicDocumentThumbnail);

        formdata.append("premisesDocument", propertyDocumentsThumbnail);
        formdata.append("copyOfApplicantCNIC", applicantCnicDocumentThumbnail);
        formdata.append("scannedCopyOfNearByElectricityBill", nearByBillDocumentThumbnail);
        formdata.append("resolutionFormDesc", resolutionDocumentThumbnail);
        formdata.append("certMemoDesc", memorandumDocumentThumbnail);
        formdata.append("certFormDesc", form29DocumentThumbnail);
        formdata.append("ownerNOC", nocOwnerDocumentThumbnail);
        formdata.append("copyOfOwnerCNIC", ownerCnicDocumentThumbnail);

        formdata.append("token", token);
        console.log(token, 'this is token')
        formdata.append("applicationProgressId", 2);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        fetch(cfpBaseUrl + "electricityNewConnection/electricityNewConnections", requestOptions)
          .then(response => response.json())
          .then(result => {
            const msg = result.message;
            if (result.status === '200') {
              const applicationID = result.applicationNo
              // console.log(applicationID, "application No");
              let res = AddApplicationsUpdateLocalStorage('1', applicationID, token)
              toast.success(msg + "\n Tracking Id is: " + applicationID, { position: toast.POSITION.TOP_RIGHT })
              resetForm()
              setIsLoading(false);
              setDefaultCircle()
              setDefaultDivision()
              setSubDivision()
              setApplicantCnicDocument()
              setApplicantCnicDocumentThumbnail()
              setPropertDocuments()
              setPropertyDocumentsThumbnail()
              setNearByBillDocument()
              setNearByBillDocumentThumbnail()
              setOwnerCnicDocument()
              setOwnerCnicDocumentThumbnail()
              setNearByAddress('')
              setNearByName('')
              setApplicantStatus('Owner')
              setAreaType('Urban')
              setApplicantCitizenship('Pakistani')
              setNocOwnerDocument()
              setNocOwnerDocumentThumbnail()
              setResolutionDocument()
              setResolutionDocumentThumbnail()
              setMemorandumDocument()
              setMemorandumDocumentThumbnail()
              setForm29Document()
              setForm29DocumentThumbnail()
            }
            else {
              setIsLoading(false);
              toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
            }
          })
          .catch(error => {
            setIsLoading(false);
            console.log(error)
            toast.error(error, { position: toast.POSITION.TOP_RIGHT })
          });
      }
    })

  useEffect(() => {
    // console.log(userCompany, "Company of user")
    if (userCompany) {

      var formdata = new FormData();
      if (parseInt(userCompany) !== 11 && parseInt(userCompany) !== 12 && parseInt(userCompany) !== 13 && parseInt(userCompany) !== 15 && parseInt(userCompany) !== 26 && parseInt(userCompany) !== 37 && parseInt(userCompany) !== 38 && parseInt(userCompany) !== 48 && parseInt(userCompany) !== 59) {
        formdata.append("companyCode", 15);
      } else {
        formdata.append("companyCode", parseInt(userCompany));
      }
      formdata.append("token", token);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(cfpBaseUrl + "customerFaciliationPortal/subDivWithCompDetails", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result, "Response")
          let hierarchyArray = result.message
          let sortedSdArray = hierarchyArray.sort(function (a, b) {
            var sdA = a.subDivisionName.toUpperCase(); // convert to uppercase to ignore case sensitivity
            var sdB = b.subDivisionName.toUpperCase(); // convert to uppercase to ignore case sensitivity
            if (sdA < sdB) {
              return -1; // nameA comes before nameB in the sorted order
            }
            if (sdA > sdB) {
              return 1; // nameA comes after nameB in the sorted order
            }
            return 0; // names are equal, their order doesn't matter
          });
          //console.log(sortedSdArray, "Printing Sorted Array")
          setHierarchyList(sortedSdArray)

          let uniqueCircles = []

          for (let i = 0; i < sortedSdArray.length; i++) {
            const circle = sortedSdArray[i];
            const existingCircle = uniqueCircles.find(c => c.code === circle.circleCode);
            if (!existingCircle) {
              uniqueCircles.push({
                code: circle.circleCode,
                name: circle.circleName
              });
            }
          }
          // console.log(uniqueCircles, "Printing Unique Circles Array")

          let sortedCircleArray = uniqueCircles.sort(function (a, b) {
            var circleA = a.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
            var circleB = b.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
            if (circleA < circleB) {
              return -1; // nameA comes before nameB in the sorted order
            }
            if (circleA > circleB) {
              return 1; // nameA comes after nameB in the sorted order
            }
            return 0; // names are equal, their order doesn't matter
          });
          // console.log(sortedCircleArray, 'Sorted Circles')
          let defCircle = sortedCircleArray.find(item => item.code === parseInt(userCircle))
          // console.log(defCircle, 'defaulot circle value')

          //setDefaultCircle(defCircle)
          //values.iv_circle = defCircle.code

          setCircleList(sortedCircleArray)

          let uniqueDivisions = []

          for (let i = 0; i < sortedSdArray.length; i++) {
            const division = sortedSdArray[i];
            if (division.circleCode === parseInt(userCircle)) {
              const existingDivision = uniqueDivisions.find(c => c.code === division.divisionCode);
              if (!existingDivision) {
                uniqueDivisions.push({
                  code: division.divisionCode,
                  name: division.divisionName
                });
              }
            }
          }

          let sortedDivisionArray = uniqueDivisions.sort(function (a, b) {
            var divisionA = a.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
            var divisionB = b.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
            if (divisionA < divisionB) {
              return -1; // nameA comes before nameB in the sorted order
            }
            if (divisionA > divisionB) {
              return 1; // nameA comes after nameB in the sorted order
            }
            return 0; // names are equal, their order doesn't matter
          });
          let defDivision = sortedDivisionArray.find(item => item.code === parseInt(userDivision))
          // console.log(defDivision, 'defaulot division value')

          //setDefaultDivision(defDivision)
          //values.iv_division = defDivision.code

          setDivisionList(sortedDivisionArray)

          let uniqueSubDivisions = []

          for (let i = 0; i < sortedSdArray.length; i++) {
            const subDivision = sortedSdArray[i];
            if (subDivision.divisionCode === parseInt(userDivision)) {
              const existingSubDivision = uniqueSubDivisions.find(c => c.code === subDivision.subDivisionCode);
              if (!existingSubDivision) {
                uniqueSubDivisions.push({
                  code: subDivision.subDivisionCode,
                  name: subDivision.subDivisionName
                });
              }
            }
          }

          let sortedSubDivisionArray = uniqueSubDivisions.sort(function (a, b) {
            var subDivisionA = a.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
            var subDivisionB = b.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
            if (subDivisionA < subDivisionB) {
              return -1; // nameA comes before nameB in the sorted order
            }
            if (subDivisionA > subDivisionB) {
              return 1; // nameA comes after nameB in the sorted order
            }
            return 0; // names are equal, their order doesn't matter
          });
          setSubDivisionList(sortedSubDivisionArray)
        }
        )
        .catch(error => console.log('error', error));
    }
  }, [])

  useEffect(() => {
    if (hierarchyList) {
      let hierarchyArray = hierarchyList
      let uniqueDivisions = []
      if (defaultCircle) {
        for (let i = 0; i < hierarchyArray.length; i++) {
          const division = hierarchyArray[i];
          if (division.circleCode === defaultCircle.code) {
            const existingDivision = uniqueDivisions.find(c => c.code === division.divisionCode);
            if (!existingDivision) {
              uniqueDivisions.push({
                code: division.divisionCode,
                name: division.divisionName
              });
            }
          }
        }

        let sortedDivisionArray = uniqueDivisions.sort(function (a, b) {
          var divisionA = a.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
          var divisionB = b.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
          if (divisionA < divisionB) {
            return -1; // nameA comes before nameB in the sorted order
          }
          if (divisionA > divisionB) {
            return 1; // nameA comes after nameB in the sorted order
          }
          return 0; // names are equal, their order doesn't matter
        });
        setDivisionList(sortedDivisionArray)
      }
    }
  }, [defaultCircle])


  useEffect(() => {
    if (defaultDivision) {
      if (hierarchyList) {
        let hierarchyArray = hierarchyList
        let uniqueSubDivisions = []
        for (let i = 0; i < hierarchyArray.length; i++) {
          const subDivision = hierarchyArray[i];
          if (defaultDivision != null) {
            if (subDivision.divisionCode === defaultDivision.code) {
              const existingSubDivision = uniqueSubDivisions.find(c => c.code === subDivision.subDivisionCode);
              if (!existingSubDivision) {
                uniqueSubDivisions.push({
                  code: subDivision.subDivisionCode,
                  name: subDivision.subDivisionName
                });
              }
            }
          }
        }
        let sortedSubDivisionArray = uniqueSubDivisions.sort(function (a, b) {
          var subDivisionA = a.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
          var subDivisionB = b.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
          if (subDivisionA < subDivisionB) {
            return -1; // nameA comes before nameB in the sorted order
          }
          if (subDivisionA > subDivisionB) {
            return 1; // nameA comes after nameB in the sorted order
          }
          return 0; // names are equal, their order doesn't matter
        });
        setSubDivisionList(sortedSubDivisionArray)
      }
    }
  }, [defaultDivision])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(cfpBaseUrl + 'electricityNewConnection/citiesList');
      const data = await response.json();
      setCitiesLists(data);
    };
    fetchData();
  }, []);

  // Calling Billing API to fetch near by details
  useEffect(() => {
    if (nearByReferenceNumber.length === 14) {
      // console.log(nearByReferenceNumber, '<-- Inside UseEffect')
      let enteredReferenceNo = nearByReferenceNumber
      let circleCode = enteredReferenceNo.slice(2, 5)
      // console.log(circleCode, 'Printing entered circle code')
      let circleObject = {}
      circleObject = circleList.find(item => item.code === parseInt(circleCode))

      // console.log(circleList, 'printing circle list')
      // console.log(circleObject, 'printing circle object')
      setDefaultCircle(circleObject)

      if (circleObject) {
        values.iv_circle = circleObject.code
      }

      let divisionCode = enteredReferenceNo.slice(2, 6)
      let subDivisionCode = enteredReferenceNo.slice(2, 7)

      let uniqueDivisions = []

      for (let i = 0; i < hierarchyList.length; i++) {
        const division = hierarchyList[i];
        if (division.circleCode === parseInt(circleCode)) {
          const existingDivision = uniqueDivisions.find(c => c.code === division.divisionCode);
          if (!existingDivision) {
            uniqueDivisions.push({
              code: division.divisionCode,
              name: division.divisionName
            });
          }
        }
      }

      let sortedDivisionArray = uniqueDivisions.sort(function (a, b) {
        var divisionA = a.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
        var divisionB = b.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
        if (divisionA < divisionB) {
          return -1; // nameA comes before nameB in the sorted order
        }
        if (divisionA > divisionB) {
          return 1; // nameA comes after nameB in the sorted order
        }
        return 0; // names are equal, their order doesn't matter
      });
      let defDivision = sortedDivisionArray.find(item => item.code === parseInt(divisionCode))
      // console.log(defDivision, 'defaulot division value')

      setDefaultDivision(defDivision)
      if (defDivision) {
        values.iv_division = defDivision.code
      }
      setDivisionList(sortedDivisionArray)

      let uniqueSubDivisions = []

      for (let i = 0; i < hierarchyList.length; i++) {
        const subDivision = hierarchyList[i];
        if (subDivision.divisionCode === parseInt(divisionCode)) {
          const existingSubDivision = uniqueSubDivisions.find(c => c.code === subDivision.subDivisionCode);
          if (!existingSubDivision) {
            uniqueSubDivisions.push({
              code: subDivision.subDivisionCode,
              name: subDivision.subDivisionName
            });
          }
        }
      }

      let sortedSubDivisionArray = uniqueSubDivisions.sort(function (a, b) {
        var subDivisionA = a.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
        var subDivisionB = b.name.toUpperCase(); // convert to uppercase to ignore case sensitivity
        if (subDivisionA < subDivisionB) {
          return -1; // nameA comes before nameB in the sorted order
        }
        if (subDivisionA > subDivisionB) {
          return 1; // nameA comes after nameB in the sorted order
        }
        return 0; // names are equal, their order doesn't matter
      });
      let subDivisionObject = sortedSubDivisionArray.find(item => item.code === parseInt(subDivisionCode))
      if (subDivisionObject) {
        values.iv_sub_divison = subDivisionObject.code
      }
      setSubDivision(subDivisionObject)
      setSubDivisionList(sortedSubDivisionArray)
      referenceApi();
    }
  }, [nearByReferenceNumber])

  // Function to fetch sub division and near by name and address through API 
  const referenceApi = () => {
    if (!nearByReferenceNumber) return;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(billingAPIUrl + nearByReferenceNumber, requestOptions)
      .then(response => response.json())
      .then(result => {
        const basicInfo = result.basicInfo
        if (basicInfo) {
          setNearByName(basicInfo.consumerName)
          setNearByAddress(basicInfo.consumerAddress1 + basicInfo.consumerAddress2)
        }
        else {
          toast.error('Reference number does not exist!', { position: toast.POSITION.TOP_RIGHT })
        }
      })
      .catch(error => console.log('error', error));
  };
  // Function to show hide fields in case applicant status is tenant
  // const fieldsShowHideTenant = (e) => {
  //   setShowHide(true);
  //   setApplicantStatus('Tenant');
  // }
  const ConnectionType = (event) => {
    handleChange(event);
    setConnectionType(event.target.value)
  };
  const NearByReferenceNumber = event => {
    handleChange(event);
    setNearByReferenceNumber(event.target.value);
  };
  const NearByNameAndAddress = event => {
    handleChange(event);
  };
  const nameAndAddressing = nearByName.concat(nearByAddress);
  // Functions to set states of Address Group
  const AreaType = event => {
    setAreaType(event.target.value);
    values.iv_area_type = event.target.value;
  };

  const ApplicantStatus = (event) => {
    setApplicantStatus(event.target.value);
    values.iv_applicant_status = event.target.value;
    // console.log(value);
  };

  const ApplicantCitizenship = (event) => {
    setApplicantCitizenship(event.target.value);
    values.iv_applicant_citizenship = event.target.value;
    // console.log(value);
  };

  // const getCompany = (code) => {
  //   let companyName = companyList.filter(item => item.code === code).name
  //   return companyName
  // }

  const getCircle = (code) => {
    if (circleList != []) {
      // console.log(circleList, "List of circle")
      let circle = circleList.find(item => item.code === code)
      // console.log(circle, "Object of circle")
      let circleName = ""
      if (circle) {
        circleName = circle.name
        // console.log(circleName, "Name of circle")
      }
      return circleName
    }
  }

  //Function to set states of documents
  const ApplicantCnicDocument = (event) => {
    // console.log('in applicant cnic functiuon')
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      // console.log(extension, 'Printing Extension');
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "copyOfApplicantCNIC." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setApplicantCnicDocument(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          // console.log('Base 64 value',e.target.result)
          setApplicantCnicDocumentThumbnail(e.target.result);
          setCopyOfApplicantCNICBase64(e.target.result.split(',')[1])
        };

        reader.readAsDataURL(file);
      } else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      }
    }
  }

  const documentValidation = (file, maxSize) => {
    // console.log(file);
    let fileExtension = file.name.split(".").pop();

    if (["jpg", "png", "pdf", "JPG", "PNG", "jpeg", "JPEG", "PDF"].includes(fileExtension.toLowerCase())) {
      if (file.size <= maxSize) {
        return 1
      } else {
        return 2
      }
    } else {
      return 3
    }
  }

  const PropertDocuments = (event) => {
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "premisesDocument." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setPropertDocuments(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          setPropertyDocumentsThumbnail(e.target.result);
          setPropertyDocumentsBase64(e.target.result.split(',')[1])
        };

        reader.readAsDataURL(file);
      }
      else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      };
    }
  }
  const NearByBillDocument = (event) => {
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "scannedCopyOfNearByElectricityBill." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setNearByBillDocument(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          setNearByBillDocumentThumbnail(e.target.result);
          setNearByBillDocumentBase64(e.target.result.split(',')[1])
        };

        reader.readAsDataURL(file);
      } else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      }
    }
  }
  const NocOwnerDocument = (event) => {
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "ownerNOC." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setNocOwnerDocument(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          setNocOwnerDocumentThumbnail(e.target.result);
          setOwnerNOCBase64(e.target.result.split(',')[1]);
        };

        reader.readAsDataURL(file);
      } else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      }
    }
    setNocAttachment(true)
  }
  const OwnerCnicDocument = (event) => {
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "copyOfOwnerCNIC." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setOwnerCnicDocument(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          setOwnerCnicDocumentThumbnail(e.target.result);
          setOwnerCNICBase64(e.target.result.split(',')[1]);
        };

        reader.readAsDataURL(file);
      } else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      }
    }
    setownerCNICAttachment(true)
  }
  const ResolutionDocument = (event) => {
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "resolutionFormDesc." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setResolutionDocument(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          setResolutionDocumentThumbnail(e.target.result);
          setResolutionDocumentBase64(e.target.result.split(',')[1])
        };

        reader.readAsDataURL(file);
      }
      else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      };
    }
  }
  const MemorandumDocument = (event) => {
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "certMemoDesc." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setMemorandumDocument(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          setMemorandumDocumentThumbnail(e.target.result);
          setMemorandumDocumentBase64(e.target.result.split(',')[1])
        };

        reader.readAsDataURL(file);
      }
      else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      };
    }
  }
  const Form29Document = (event) => {
    handleChange(event);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let fileName = file.name
      let fileNameArray = fileName.split('.')
      let extension = fileNameArray[fileNameArray.length - 1]
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const documentValidate = documentValidation(file, maxSize)
      if (documentValidate === 1) {
        const newFileName = "certFormDesc." + extension;
        const renamedFile = new File([file], newFileName, { type: file.type });
        setForm29Document(renamedFile);
        const reader = new FileReader();

        reader.onload = (e) => {
          // Set the thumbnail image as the data URL
          setForm29DocumentThumbnail(e.target.result);
          setForm29DocumentBase64(e.target.result.split(',')[1]);
        };

        reader.readAsDataURL(file);
      }
      else if (documentValidate === 2) {
        toast.error("File size exceeds " + maxSize / 1024 / 1024 + "MB limit.", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed.", { position: toast.POSITION.TOP_RIGHT });
      };
    }
  }


  // Function to set state of Terms and conditions
  const TermCondition = event => {
    setTermCondition(event.target.value);
  };
  // Reseting the form enteries
  function resetting() {
    setConnectionType('');
    setNearByReferenceNumber('');
    setNearByName('');
    setNearByAddress('');
    setSubDivision('');
    setApplicantStatus('');
    setAreaType('');
    setApplicantCnicDocument('');
    setPropertDocuments('');
    setNearByBillDocument('');
    setNocOwnerDocument('');
    setOwnerCnicDocument('');
    setResolutionDocument('');
    setMemorandumDocument('');
    setForm29Document('');
    setTermCondition('');
  }

  const filterOptions = (options, { inputValue }) => {
    const inputWords = inputValue.trim().split(' ');
    let filteredOptions = options.filter((option) =>
      option.toLowerCase().startsWith(inputWords[0].toLowerCase())
    );
    if (inputWords.length > 1) {
      const remainingWords = inputWords.slice(1);
      filteredOptions = filteredOptions.filter((option) => {
        const optionWords = option.trim().split(' ');
        return remainingWords.every((word) =>
          optionWords.some((optionWord) =>
            optionWord.toLowerCase().startsWith(word.toLowerCase())
          )
        );
      });
    }
    return filteredOptions;
  };

  return (
    <Grid container className='nC'>
      <Box className='nCContainer'>
        <Typography variant='h6' className='heading'>
          New Connection Form
        </Typography>
        <Box className="progressBarBackground" >
          <Box className="progressBarContainer">
            <Box className="pbDocGroup">
              <Typography className="badge">
                {
                  applicantCnicDocument
                    ?
                    <Box className='backgroundAttached'>
                      <DoneIcon className='icon' />
                    </Box> :
                    <p className='backgroundUnAttached'>1</p>
                }
              </Typography>
              <Typography className='badgeText'>Applicant's CNIC.</Typography>
            </Box>
            <Box className="pbDocGroup">
              <Typography className="badge">
                {
                  propertyDocuments
                    ?
                    <Box className='backgroundAttached'>
                      <DoneIcon className='icon' />
                    </Box> :
                    <p className='backgroundUnAttached'>2</p>
                }
              </Typography>
              <Typography className='badgeText'>Property Documents</Typography>
            </Box>
            <Box className="pbDocGroup">
              <Typography className="badge">
                {
                  nearByBillDocument
                    ? <Box className='backgroundAttached'>
                      <DoneIcon className='icon' />
                    </Box> :
                    <p className='backgroundUnAttached'>3</p>
                }
              </Typography>
              <Typography className='badgeText'>Near-by Electricity Bill</Typography>
            </Box>

            {values.iv_applicant_status === 'Tenant' &&
              <>
                <Box className="pbDocGroup">
                  <Typography className="badge">
                    {
                      ownerCnicDocument
                        ? <Box className='backgroundAttached'>
                          <DoneIcon className='icon' />
                        </Box> :
                        <p className='backgroundUnAttached'>4</p>
                    }
                  </Typography>
                  <Typography className='badgeText'>Owner's CNIC.</Typography>
                </Box>
                <Box className="pbDocGroup">
                  <Typography className="badge">
                    {
                      nocOwnerDocument
                        ? <Box className='backgroundAttached'>
                          <DoneIcon className='icon' />
                        </Box> :
                        <p className='backgroundUnAttached'>5</p>
                    }</Typography>
                  <Typography className='badgeText'>Noc from Owner</Typography>
                </Box>
              </>
            }
            {
              (connectionType === 'Industrial')
                ?
                <>
                  <Box className="pbDocGroup">
                    <Typography className="badge">
                      {
                        resolutionDocument
                          ?
                          <Box className='backgroundAttached'>
                            <DoneIcon className='icon' />
                          </Box> :
                          <p className='backgroundUnAttached'>
                            {values.iv_applicant_status === 'Owner' ? '4' : '6'}
                          </p>
                      }
                    </Typography>
                    <Typography className='badgeText'> BoD's Resolution Form</Typography>
                  </Box>
                  <Box className="pbDocGroup">
                    <Typography className="badge">
                      {
                        memorandumDocument
                          ?
                          <Box className='backgroundAttached'>
                            <DoneIcon className='icon' />
                          </Box> :
                          <p className='backgroundUnAttached'>
                            {values.iv_applicant_status === 'Owner' ? '5' : '7'}
                          </p>}
                    </Typography>
                    <Typography className='badgeText'>Memorandum</Typography>
                  </Box>
                  <Box className="pbDocGroup">
                    <Typography className="badge">
                      {
                        form29Document
                          ? <Box className='backgroundAttached'>
                            <DoneIcon className='icon' />
                          </Box> :
                          <p className='backgroundUnAttached'>
                            {values.iv_applicant_status === 'Owner' ? '6' : '8'}
                          </p>}
                    </Typography>
                    <Typography className='badgeText'>Form-29</Typography>
                  </Box>
                </> : null}
          </Box>
        </Box>
        <form className='ncform'>
          <Typography variant="h6" className='groupTitle' >
            Application Details
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography className='fieldLabel' > Connection Type</Typography>
              <Select
                autoWidth={false}
                value={values.iv_connection_type}
                onChange={ConnectionType}
                onBlur={handleBlur}
                displayEmpty
                className='dropdownList'
                name="iv_connection_type"
                id="iv_connection_type"
              >
                <MenuItem value=''>Select Type</MenuItem>
                <MenuItem value='Domestic'>Domestic</MenuItem>
                <MenuItem value='Commercial'>Commercial</MenuItem>
                <MenuItem value='Industrial' >Industrial</MenuItem>
                <MenuItem value='Agriculture'>Agriculture</MenuItem>
                <MenuItem value='Tubewell'>Tubewell</MenuItem>
                <MenuItem value='Temporary'>Temporary</MenuItem>
                <MenuItem value='General Services'>General Services</MenuItem>
                <MenuItem value='Electrification'>Electrification</MenuItem>
                <MenuItem value='Street Light'>Street Light</MenuItem>
                <MenuItem value='Corporate Company'>Corporate Company</MenuItem>
              </Select>
              <Box className='from-Error'>
                {errors.iv_connection_type && touched.iv_connection_type ? (errors.iv_connection_type) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel' > Applied Load  (kW)</Typography>
              <TextField
                required
                type='number'
                InputProps={{
                  inputProps: { min: 0 }
                }}
                autoComplete='off'
                name="iv_applied_load"
                value={values.iv_applied_load}
                onChange={handleChange}
                onBlur={handleBlur}
                id="iv_applied_load"
                className='textInputField'
              />
              <Box className='from-Error'>
                {errors.iv_applied_load && touched.iv_applied_load ? (errors.iv_applied_load) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel' >Near-by Reference No.<span style={{ color: "#A1A1A1" }}>(Optional)</span></Typography>
              <TextField
                type='text'
                name="iv_near_by_reference_no"
                autoComplete='off'
                value={values.iv_near_by_reference_no}
                onChange={NearByReferenceNumber}
                onBlur={handleBlur}
                inputProps={{ maxLength: 14 }}
                id="iv_near_by_reference_no"
                className='textInputField'
              />
              <Box className='from-Error'>
                {errors.iv_near_by_reference_no && touched.iv_near_by_reference_no ? (errors.iv_near_by_reference_no) : null}
              </Box>
            </Grid>
            {/* <Grid item xs={4}>
              <Typography className='fieldLabel' >Company</Typography>
              <Autocomplete
                id="iv_disco"
                name="iv_disco"
                suppressDefaultValueWarning
                options={companyList}
                defaultValue={companyList.find(item => item.code === parseInt(userCompany))}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" value={getCompany(parseInt(userCompany))} className='textInputFieldAutoSelect' />
                )}
                onChange={(event, value) => {
                  if (value) {
                    setCompanyCode(value.code)
                    setCircleCode()
                    setDivisionCode()
                    setSubDivisionCode()
                  }
                }}
              />
              <Box className='from-Error'>
                {errors.iv_disco && touched.iv_disco ? (errors.iv_disco) : null}
              </Box>
            </Grid> */}
            <Grid item xs={4}>
              <Typography className='fieldLabel' >Circle</Typography>
              <Autocomplete
                id="iv_circle"
                name="iv_circle"
                value={defaultCircle ? defaultCircle : null}
                options={circleList}
                suppressDefaultValueWarning
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" className='textInputFieldAutoSelect' />
                )}
                onChange={(event, value) => {
                  // console.log(value, "Vlaue of circle")
                  if (value) {
                    setDefaultCircle(value);
                    values.iv_circle = value.code
                    setDefaultDivision();
                    setSubDivision();
                  }
                }}
              />
              <Box className='from-Error'>
                {errors.iv_circle && touched.iv_circle ? (errors.iv_circle) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel' >Division</Typography>
              <Autocomplete
                id="iv_division"
                name="iv_division"
                options={divisionList}
                value={defaultDivision ? defaultDivision : null}
                suppressDefaultValueWarning
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" className='textInputFieldAutoSelect' />
                )}
                onChange={(event, value) => {
                  if (value) {
                    setDefaultDivision(value);
                    values.iv_division = value.code
                    setSubDivision()
                  }
                }}
              />
              <Box className='from-Error'>
                {errors.iv_division && touched.iv_division ? (errors.iv_division) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel' >Sub Division</Typography>
              <Autocomplete
                id="iv_sub_divison"
                value={subDivision ? subDivision : null}
                name="iv_sub_divison"
                options={subDivisionList}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" className='textInputFieldAutoSelect' />
                )}
                onChange={(event, value) => {
                  if (value) {
                    setSubDivision(value);
                    values.iv_sub_divison = value.code
                  }
                }}
              />
              <Box className='from-Error'>
                {errors.iv_sub_divison && touched.iv_sub_divison ? (errors.iv_sub_divison) : null}
              </Box>
            </Grid>
          </Grid>

          <Grid container >

            <Grid item xs={8}>
              <Typography className='fieldLabelNameAndAddressing'>Near-by Name & Address</Typography>
              <TextField name='NearByNameAndAddress'
                required
                type='text'
                onChange={NearByNameAndAddress}
                onBlur={handleBlur}
                value={nameAndAddressing}
                disabled
                className='textInputFieldNameAndAddressing' />
            </Grid>
          </Grid>
          <Typography variant="h6" className='groupTitle'>
            Applicant's Details
          </Typography>
          <Grid container >
            <Grid item xs={4}>
              <Typography className='fieldLabel' > Status</Typography>
              {/* <Select
                autoWidth={false}
                value={values.iv_applicant_status}
                onChange={handleChange}
                onBlur={handleBlur}
                displayEmpty
                name="iv_applicant_status"
                className='dropdownList'
                id="iv_applicant_status"
              >
                <MenuItem value=''>Select Status</MenuItem>
                <MenuItem value='Owner' onChange={fieldsShowHideOwner}>Owner</MenuItem>
                <MenuItem value='Tenant' onChange={fieldsShowHideTenant}>Tenant</MenuItem>
              </Select> */}
              <FormControl className='form-control' >
                <RadioGroup
                  className='radio-group'
                  row
                  name="iv_applicant_status"
                  defaultValue={applicantStatus}
                  value={applicantStatus}
                  onChange={ApplicantStatus}
                >
                  <FormControlLabel
                    value="Owner"
                    className='form-control-label'
                    control={<Radio />}
                    label="Owner"
                    name='Owner'
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Tenant"
                    className='form-control-label'
                    control={<Radio />}
                    label="Tenant"
                    name='Tenant'
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              <Box className='from-Error'>
                {errors.iv_applicant_status && touched.iv_applicant_status ? (errors.iv_applicant_status) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel' >Name</Typography>
              <TextField
                required
                type='text'
                name="iv_applicant_name"
                value={values.iv_applicant_name}
                autoComplete='off'
                onChange={handleChange}
                onBlur={handleBlur}
                id="iv_applicant_name"
                className='textInputField'
              />
              <Box className='from-Error'>
                {errors.iv_applicant_name && touched.iv_applicant_name ? (errors.iv_applicant_name) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel'>NIC. / CNIC. / NICOP.</Typography>
              <TextField
                required
                type='text'
                name="iv_applicant_cnic"
                value={values.iv_applicant_cnic}
                onChange={handleChange}
                onBlur={handleBlur}
                id="iv_applicant_cnic"
                className='textInputField'
                inputProps={{ maxLength: 13, autoComplete: 'off' }}
              />
              <Box className='from-Error'>
                {errors.iv_applicant_cnic && touched.iv_applicant_cnic ? (errors.iv_applicant_cnic) : null}
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography className='fieldLabel'> Citizenship</Typography>
              {/* <Select
                autoWidth={false}
                value={values.iv_applicant_citizenship}
                onChange={handleChange}
                onBlur={handleBlur}
                displayEmpty
                name="iv_applicant_citizenship"
                size='small'
                id="iiv_applicant_citizenship"
                className='dropdownList'
              >
                <MenuItem value=''>Select Citizenship</MenuItem>
                <MenuItem value='Pakistani'>Pakistani</MenuItem>
                <MenuItem value='Foreigner'>Foreigner</MenuItem>
              </Select> */}
              <FormControl className='form-control' >
                <RadioGroup
                  className='radio-group'
                  row
                  name="iv_applicant_citizenship"
                  defaultValue={applicantCitizenship}
                  value={applicantCitizenship}
                  onChange={ApplicantCitizenship}
                >
                  <FormControlLabel
                    value="Pakistani"
                    className='form-control-label'
                    control={<Radio />}
                    label="Pakistani"
                    name='Pakistani'
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Foreigner"
                    className='form-control-label'
                    control={<Radio />}
                    label="Foreigner"
                    name='Foreigner'
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              <Box className='from-Error' sx={{ marginLeft: '-1%' }}>
                {errors.iv_applicant_citizenship && touched.iv_applicant_citizenship ? (errors.iv_applicant_citizenship) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel'  >Phone No.</Typography>
              <TextField
                required
                type='text'
                name="iv_applicant_phone_no"
                autoComplete='off'
                value={values.iv_applicant_phone_no}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 11 }}
                id="iv_applicant_phone_no"
                className='textInputField'
              />
              <Box className='from-Error'>
                {errors.iv_applicant_phone_no && touched.iv_applicant_phone_no ? (errors.iv_applicant_phone_no) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel'  >Email<span style={{ color: "#A1A1A1" }}>(Optional)</span></Typography>
              <TextField
                autoComplete='off'
                required
                type='text'
                name="iv_applicant_email"
                value={values.iv_applicant_email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="iv_applicant_email"
                className='textInputField'
              />
              <Box className='from-Error'>
                {errors.iv_applicant_email && touched.iv_applicant_email ? (errors.iv_applicant_email) : null}
              </Box>
            </Grid>
          </Grid>
          {
            (connectionType === 'Industrial' || connectionType === 'Commercial' || connectionType === 'Corporate Company') ?
              <>
                {/* NTN & STRN */}
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className='fieldLabel'> NTN.</Typography>
                    <TextField
                      autoComplete='off'
                      required
                      type='double'
                      name="iv_ntn"
                      value={values.iv_ntn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ maxLength: 13 }}
                      label=""
                      id="iv_ntn"
                      className='textInputField'
                    />
                    <Box className='from-Error' sx={{ marginLeft: '4%' }}>
                      {errors.iv_ntn && touched.iv_ntn ? (errors.iv_ntn) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className='fieldLabel'  >STRN.</Typography>
                    <TextField
                      required
                      autoComplete='off'
                      type='text'
                      name="iv_strn"
                      value={values.iv_strn}
                      inputProps={{ maxLength: 13 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="iv_strn"
                      className='textInputField'
                    />
                    <Box className='from-Error'>
                      {errors.iv_strn && touched.iv_strn ? (errors.iv_strn) : null}
                    </Box>
                  </Grid>
                </Grid>
              </> : null
          }
          {
            values.iv_applicant_status === "Tenant" ?
              <>
                <Typography variant="h6" className='groupTitle'>
                  Owner's Details
                </Typography>
                <Grid container >
                  <Grid item xs={4}>
                    <Typography className='fieldLabel' >Name</Typography>
                    <TextField
                      required
                      type='text'
                      autoComplete='off'
                      name="iv_owner_name"
                      value={(values.iv_owner_name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="iv_owner_name"
                      className='textInputField'
                    />
                    <Box className='from-Error'>
                      {errors.iv_owner_name && touched.iv_owner_name ? (errors.iv_owner_name) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className='fieldLabel'  >NIC. / CNIC. / NICOP.</Typography>
                    <TextField
                      required
                      type='double'
                      autoComplete='off'
                      value={values.iv_owner_cnic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ maxLength: 13 }}
                      name="iv_owner_cnic"
                      id="iv_owner_cnic"
                      className='textInputField'
                    />
                    <Box className='from-Error'>
                      {errors.iv_owner_cnic && touched.iv_owner_cnic ? (errors.iv_owner_cnic) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className='fieldLabel' >Phone No.</Typography>
                    <TextField
                      required
                      type='text'
                      autoComplete='off'
                      inputProps={{ maxLength: 11 }}
                      name="iv_owner_phone_no"
                      value={values.iv_owner_phone_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="iv_owner_phone_no"
                      className='textInputField'
                    />
                    <Box className='from-Error'>
                      {errors.iv_owner_phone_no && touched.iv_owner_phone_no ? (errors.iv_owner_phone_no) : null}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography className='fieldLabel'  >Email<span style={{ color: "#A1A1A1" }}>(Optional)</span></Typography>
                    <TextField
                      required
                      type='text'
                      value={values.iv_owner_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete='off'
                      name="iv_owner_email"
                      id="iv_owner_email"
                      className='textInputField'
                    />
                    <Box className='from-Error' >
                      {errors.iv_owner_email && touched.iv_owner_email ? (errors.iv_owner_email) : null}
                    </Box>
                  </Grid>
                </Grid>
              </> : null
          }
          <Typography variant="h6" className='groupTitle'>
            Address
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <Typography className='fieldLabel'   >Area Type</Typography>
              {/* <Select
                value={areaType}
                onChange={AreaType}
                onBlur={handleBlur}
                displayEmpty
                name="iv_area_type"
                id="iv_area_type"
                className='dropdownList'
              >
                <MenuItem value=''>Select Area Type</MenuItem>
                <MenuItem value='Urban'>Urban</MenuItem>
                <MenuItem value='Rural'>Rural</MenuItem>
              </Select> */}
              <FormControl className='form-control' >
                <RadioGroup
                  className='radio-group'
                  row
                  name="iv_area_type"
                  defaultValue={areaType}
                  value={areaType}
                  onChange={AreaType}
                >
                  <FormControlLabel
                    value="Urban"
                    className='form-control-label'
                    control={<Radio />}
                    label="Urban"
                    name='Urban'
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Rural"
                    className='form-control-label'
                    control={<Radio />}
                    label="Rural"
                    name='Rural'
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              <Box className='from-Error'>
                {errors.iv_area_type && touched.iv_area_type ? (errors.iv_area_type) : null}
              </Box>
            </Grid>
            {areaType === "Urban" ?
              <>
                <Grid item xs={2} sx={{ paddingLeft: '1%' }}>
                  <Typography className='fieldLabel' >House</Typography>
                  <TextField
                    required
                    type='text'
                    name="iv_house"
                    autoComplete='off'
                    value={values.iv_house}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="iv_house"
                    className='textInputField'
                  />
                  <Box className='from-Error'>
                    {errors.iv_house && touched.iv_house ? (errors.iv_house) : null}
                  </Box>
                </Grid>
                <Grid item xs={2} sx={{ paddingRight: '1%' }}>
                  <Typography className='fieldLabel'  >Street</Typography>
                  <TextField
                    autoComplete='off'
                    required
                    type='text'
                    name="iv_street"
                    value={values.iv_street}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    id="iv_street"
                    className='textInputField' />
                  <Box className='from-Error'>
                    {errors.iv_street && touched.iv_street ? (errors.iv_street) : null}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography className='fieldLabel' >Sector / Block / Phase / Mohala</Typography>
                  <TextField
                    autoComplete='off'
                    required
                    type='text'
                    name="iv_sector_block_phase_mohala"
                    value={values.iv_sector_block_phase_mohala}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    id="iv_sector_block_phase_mohala"

                    className='textInputField'
                  />
                  <Box className='from-Error'>
                    {errors.iv_sector_block_phase_mohala && touched.iv_sector_block_phase_mohala ? (errors.iv_sector_block_phase_mohala) : null}
                  </Box>
                </Grid>
              </>
              :
              <>
                <Grid item xs={4}>
                  <Typography className='fieldLabel'> Chak / Street</Typography>
                  <TextField
                    required
                    type='text'
                    autoComplete='off'
                    name="iv_chak_street"
                    value={values.iv_chak_street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="iv_chak_street"
                    className='textInputField' />
                  <Box className='from-Error'>
                    {errors.iv_chak_street && touched.iv_chak_street ? (errors.iv_chak_street) : null}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography className='fieldLabel'  >Village</Typography>
                  <TextField
                    required
                    autoComplete='off'
                    type='text'
                    name="iv_village"
                    value={values.iv_village}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    id="iv_village"

                    className='textInputField' />
                  <Box className='from-Error'>
                    {errors.iv_village && touched.iv_village ? (errors.iv_village) : null}
                  </Box>
                </Grid>
              </>
            }
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography className='fieldLabel'  >Town / Tehsil</Typography>
              <TextField
                required
                autoComplete='off'
                type='text'
                name="iv_town_tehsil"
                value={values.iv_town_tehsil}
                onChange={handleChange}
                onBlur={handleBlur}
                id="iv_town_tehsil"
                className='textInputField' />
              <Box className='from-Error' >
                {errors.iv_town_tehsil && touched.iv_town_tehsil ? (errors.iv_town_tehsil) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel'  >District / City</Typography>
              <Autocomplete
                id="iv_city_district"
                name="iv_city_district"
                autoComplete='off'
                options={citiesLists}
                value={values.iv_city_district}
                filterOptions={filterOptions}
                onChange={(event, newValue) => {
                  if (newValue) {
                    handleChange('iv_city_district')(newValue);
                  }
                }}
                onBlur={handleBlur}
                renderInput={(params) =>
                  <TextField {...params}
                    required
                    type='text'
                    className='textInputFieldAutoSelect' />}
              />
              <Box className='from-Error'>
                {errors.iv_city_district && touched.iv_city_district ? (errors.iv_city_district) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className='fieldLabel'  >No. of meters already installed</Typography>
              <TextField
                required
                autoComplete='off'
                type='number'
                InputProps={{
                  inputProps: { min: 0 }
                }}
                name="iv_meter_installed"
                value={values.iv_meter_installed}
                onChange={handleChange}
                onBlur={handleBlur}
                id="iv_meter_installed"
                className='textInputField'
              />
              <Box className='from-Error'>
                {errors.iv_meter_installed && touched.iv_meter_installed ? (errors.iv_meter_installed) : null}
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h6" className='groupTitle'>
            Required Documents
          </Typography>
          <Grid container spacing={1} className='documentsContainer' >
            <Grid item lg='2' >
              <Typography className='documentLabel' >1- Applicant's CNIC.</Typography>
              <Box className='documentError'>{errors.iv_applicant_cnic_document && touched.iv_applicant_cnic_document ? (errors.iv_applicant_cnic_document) : null}</Box>
            </Grid>
            <Grid item lg='2'>
              {
                applicantCnicDocument ?
                  <>
                    <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setApplicantCnicDocument('') }} />}  >
                      {applicantCnicDocumentThumbnail && <img src={applicantCnicDocumentThumbnail} alt="Applicant CNIC" width="100" />}
                    </Button>
                  </>
                  :
                  <>
                    <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                      Upload
                      <input hidden accept="image/*" id='iv_applicant_cnic_document' name='iv_applicant_cnic_document' multiple type="file" onChange={ApplicantCnicDocument} />
                    </Button>
                  </>
              }
            </Grid>
            <Grid item lg='2'>
              <Typography className='documentLabel' >2-  Property documents</Typography>
              <Box className='documentError'> {errors.iv_property_documents && touched.iv_property_documents ? (errors.iv_property_documents) : null}</Box>
            </Grid>
            <Grid item lg='2'>
              {
                propertyDocuments ?
                  <>
                    <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setPropertDocuments('') }} />}  >
                      {propertyDocumentsThumbnail && <img src={propertyDocumentsThumbnail} alt="Property Documents" width="80" />}
                    </Button>
                  </>
                  :
                  <>
                    <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                      Upload
                      <input hidden accept="image/*" id='iv_property_documents' name='iv_property_documents' multiple type="file" onChange={PropertDocuments} />
                    </Button>
                  </>
              }
            </Grid>
            <Grid item lg='2'>
              <Typography className='documentLabel'>3- Near-by electricity bill <span style={{ color: "#A1A1A1", marginLeft: '3%' }}>(Optional)</span></Typography>
              <Box className='documentError'> {errors.iv_near_by_bill && touched.iv_near_by_bill ? (errors.iv_near_by_bill) : null}</Box>
            </Grid>
            <Grid item lg='2'>
              {
                nearByBillDocument ?
                  <>
                    <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setNearByBillDocument('') }} />}  >
                      {nearByBillDocumentThumbnail && <img src={nearByBillDocumentThumbnail} alt="Near-By-Electricity Documents" width="80" />}
                    </Button>
                  </>
                  :
                  <>
                    <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                      Upload
                      <input hidden accept="image/*" id='iv_near_by_bill' name='iv_near_by_bill' multiple type="file" onChange={NearByBillDocument} />
                    </Button>
                  </>
              }
            </Grid>
            {values.iv_applicant_status === 'Tenant' &&
              <>
                <Grid item lg='2'>
                  <Typography className='documentLabel'>4- Owner's CNIC.</Typography>
                  <Box className='documentError'> {errors.iv_owner_cnic_document && touched.iv_owner_cnic_document ? (errors.iv_owner_cnic_document) : null}</Box>
                </Grid>
                <Grid item lg='2'>
                  {
                    ownerCnicDocument ?
                      <>
                        <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setOwnerCnicDocument('') }} />}  >
                          {ownerCnicDocumentThumbnail && <img src={ownerCnicDocumentThumbnail} alt="Owner CNIC Documents" width="100" />}
                        </Button>
                      </>
                      :
                      <>
                        <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                          Upload
                          <input hidden accept="image/*" id='iv_owner_cnic_document' name='iv_owner_cnic_document' multiple type="file" onChange={OwnerCnicDocument} />
                        </Button>
                      </>
                  }
                </Grid>
                <Grid item lg='2'>
                  <Typography className='documentLabel'>5- NOC. from owner</Typography>
                  <Box className='documentError'>  {errors.iv_noc_owner && touched.iv_noc_owner ? (errors.iv_noc_owner) : null}</Box>
                </Grid>
                <Grid item lg='2'>
                  {
                    nocOwnerDocument ?
                      <>
                        <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setNocOwnerDocument('') }} />}  >
                          {nocOwnerDocumentThumbnail && <img src={nocOwnerDocumentThumbnail} alt="Noc Owner Documents" width="80" />}
                        </Button>
                      </>
                      :
                      <>
                        <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                          Upload
                          <input hidden accept="image/*" id='iv_noc_owner' name='iv_noc_owner' multiple type="file" onChange={NocOwnerDocument} />
                        </Button>
                      </>
                  }
                </Grid>
              </>
            }
            {(values.iv_connection_type === "Industrial")
              ? <>
                <Grid item lg='2'>
                  <Typography className='documentLabel'>
                    {values.iv_applicant_status === 'Owner' ?
                      '4- ' :
                      '6- '
                    }
                    Resolution from BoD's in the favour of sigantory
                  </Typography>
                  <Box className='documentError'>  {errors.iv_resolution && touched.iv_resolution ? (errors.iv_resolution) : null}</Box>
                </Grid>
                <Grid item lg='2'>
                  {
                    resolutionDocument ?
                      <>
                        <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setResolutionDocument('') }} />}  >
                          {resolutionDocumentThumbnail && <img src={resolutionDocumentThumbnail} alt="Resolution Documents" width="80" />}
                        </Button>
                      </>
                      :
                      <>
                        <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                          Upload
                          <input hidden accept="image/*" id='iv_resolution' name='iv_resolution' multiple type="file" onChange={ResolutionDocument} />
                        </Button>
                      </>
                  }
                </Grid>
                <Grid item lg='2'>
                  <Typography className='documentLabel'>
                    {values.iv_applicant_status === 'Owner' ?
                      '5- ' :
                      '7- '
                    }
                    Memorandum of association certificate <span style={{ color: "#A1A1A1", }}>(Optional)</span>
                  </Typography>
                  <Box className='documentError'>  {errors.iv_memo && touched.iv_memo ? (errors.iv_memo) : null}</Box>
                </Grid>
                <Grid item lg='2'>
                  {
                    memorandumDocument ?
                      <>
                        <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setMemorandumDocument('') }} />}  >
                          {memorandumDocumentThumbnail && <img src={memorandumDocumentThumbnail} alt="Memorandom Documents" width="80" />}
                        </Button>
                      </>
                      :
                      <>
                        <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                          Upload
                          <input hidden accept="image/*" id='iv_memo' name='iv_memo' multiple type="file" onChange={MemorandumDocument} />
                        </Button>
                      </>
                  }
                </Grid>
                <Grid item lg='2'>
                  <Typography className='documentLabel'>
                    {values.iv_applicant_status === 'Owner' ?
                      '6- ' :
                      '8- '
                    }
                    Certified true copy of form-29
                  </Typography>
                  <Box className='documentError'>  {errors.iv_form29initial && touched.iv_form29initial ? (errors.iv_form29initial) : null}</Box>
                </Grid>
                <Grid item lg='2'>
                  {
                    form29Document ?
                      <>
                        <Button varient='contained' component="label" startIcon={<DeleteOutlinedIcon sx={{ color: 'red' }} onClick={() => { setForm29Document('') }} />}  >
                          {form29DocumentThumbnail && <img src={form29DocumentThumbnail} alt="Form-29 Documents" width="80" />}
                        </Button>
                      </>
                      :
                      <>
                        <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                          Upload
                          <input hidden accept="image/*" id='iv_form29initial' name='iv_form29initial' multiple type="file" onChange={Form29Document} />
                        </Button>
                      </>
                  }
                </Grid>
              </> :
              null
            }
          </Grid>
          {/* <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ marginLeft: '1%', width: '100%' }}>
                <Typography variant="h6" className='groupTitle'>
                  Terms and Conditions
                </Typography>
                <Typography component='p' variant='p' backgroundColor="#EEF1F7" width='93%' height='30%' marginTop="1%" padding='2%'>
                  1. I/we agree to get a connection from DISCO (later stated as department/dept.) for the appliances mentioned above. I/we also agree that I/we will pay the tarrif and scheduled service charges as stated by department for the services and electricity provided to me/us. Attested photocopy of my CNIC is uploaded with the request form, further I/we testify that electricity wiring is installed by authorized contractor of provincial government. Adding more, I/we will be responsible for any damage due to malfunction of wiring. I testify that I do not owe any dues to DISCO/WAPDA for connection against personally owned property or for connection against previously rented property by me. And there was no previous connection at the place where new connection is requested, also if it is found that there was a previous connection on the same address, I/we will be responsible to pay any remaining dues.
                  <br /> 2. I agree and have read above conditions.<a href='http://www.enc.com.pk/blank_forms/Abridge_condition.pdf' target="_blank">Read here </a>
                </Typography>
                <FormGroup >
                  <FormControlLabel value={termCondition}
                    onChange={TermCondition} control={<Checkbox />} label="I Agree the Terms & Conditions" />
                </FormGroup>
              </Box>
            </Grid>
          </Grid> */}
          <Box sx={{ marginTop: '1%' }}>
            <Button sx={{ width: '35%', marginLeft: '1%', marginBottom: '1%' }} variant="contained" component="label" type='submit' onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                'Submit'
              )}
            </Button>
            <ToastContainer />
          </Box>
        </form >
      </Box >
    </Grid >
  );
}

export default NewConnectionForm;