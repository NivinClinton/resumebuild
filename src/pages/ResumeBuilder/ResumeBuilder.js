import React, { useEffect, useState } from 'react'
import './ResumeBuilder.css'
import plus from '../../assets/plus.svg'
import axios from 'axios'
import { countrydata } from "../../components/countrylist"
import $ from 'jquery'

function ResumeBuilder() {


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [postCode, setPostCode] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [county, setCounty] = useState('')
  const [country, setCountry] = useState('')
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('')
  const [education, setEducation] = useState('')
  const [role, setRole] = useState('')
  const [show, setShow] = useState(false)
  const [addDown, setAddDown] = useState(false)
  const [skillList, setSkillList] = useState('')
  const [experienceList, setExperienceList] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [profilePic, setProfilePic] = useState('')

  const [careerObjective, setCareerObjective] = useState('')
  const [postalCode, setPostalCode] = useState([])
  const [updateCounty, setUpdateCounty] = useState([])

  const [countryList, setCountryList] = useState([])

  console.log(updateCounty[0]);

  const sendRequest = async () => {
    const res = await axios
      .get('https://api.getAddress.io/find/' + postCode + '?api-key=Q9ZB0SGtm06AO7diEh8PXA30491&expand=true')
      .catch((err) => console.log(err));

    const data = await res.data.addresses
      .map((address) => {
        return address.formatted_address
        //   setPostalCode(address.formatted_address);
      });
    //     data.map((data)=>{
    // console.log(data.country);
    //     })
    console.log(data);
    return data;

    // console.log('https://api.getAddress.io/find/'+postCode+'?api-key=Q9ZB0SGtm06AO7diEh8PXA30491');
  };


  const updateCountryList = () => {
    setCountryList(countrydata)
  }
  useEffect(() => {
    updateCountryList()
    console.log(countryList);

  }, []);


  const updateCounty1 = async () => {
    const res = await axios
      .get('https://api.getAddress.io/find/' + postCode + '?api-key=Q9ZB0SGtm06AO7diEh8PXA30491&expand=true')
      .catch((err) => console.log(err));

    const data = await res.data.addresses
      .map((address) => {
        return address.county
        //   setPostalCode(address.formatted_address);
      });
    setUpdateCounty(data)

    //     data.map((data)=>{
    // console.log(data.country);
    //     })
    console.log(data);
    return data;
  }
  useEffect(() => {
    sendRequest().then((data) => {
      setPostalCode(data)
      update()
      updateCounty1()


    })
  }, [postCode]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true)

    // sendRequest().then((data)=>{setPostalCode(data)}).then(()=>{console.log(postalCode)})

    // if (firstName && lastName && mobile.length > 5 && email && postCode  && county && country && skills && experience && education && role) {
     
    // }
    // else {
    //   setErrorMessage(true)
    //   setShow(false)
    // }


  }
  const additionSkills = () => {

    if (skills != "") {
      const skillDetails = {
        id: Math.floor(Math.random() * 1000),
        value: skills,
        isCompleted: false,
      };

      setSkillList([...skillList, skillDetails]);
    }

  }
  const deletetaskSkills = (e, id) => {
    e.preventDefault();
    setSkillList(skillList.filter((t) => t.id != id));
  };
  const additionExperience = () => {

    if (experience != "") {
      const experienceDetails = {
        id: Math.floor(Math.random() * 1000),
        value: experience,
        isCompleted: false,
      };

      setExperienceList([...experienceList, experienceDetails]);
    }

  }
  const deletetaskExperience = (e, id) => {
    e.preventDefault();
    setExperienceList(experienceList.filter((t) => t.id != id));
  };

  console.log(skills);
  const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} />
  }


  const update = () => {
    const selectDrop = document.querySelector('#StreetName')
    let output = '';
    postalCode.forEach(StreetName => {
      output += `<option>${StreetName}</option>`;
    })
    selectDrop.innerHTML = output;

  }

  // document.addEventListener('DOMContentLoaded', () => {
  //   const selectDrop = document.querySelector('#StreetName')
  //   let output = '';
  //   postalCode.forEach(StreetName => {
  //     output += `<option>${StreetName}</option>`;
  //   })
  //   selectDrop.innerHTML = output;
  // })
  // document.addEventListener('DOMContentLoaded', () => {
  //   const selectDrop = document.querySelector('#Country')

  //   fetch('https://api.first.org/data/v1/countries').then(res=>{
  //     return res.json()
  //   }).then(data=>{

  //     let output = '';
  //     data.forEach(data=> {
  //       output += `<option>${data.dz}</option>`;
  //     })
  //     selectDrop.innerHTML = output;
  //   }).catch(err=>{
  //     console.log(err);
  //   })

  // })

  $(".dropdown-menu li a").click(function () {

    $(".btn:first-child").html($(this).text() + ' <span class="caret"></span>');

  });


  return (
    <div className='ResumeBuilder'>
      <h1>Resume Builder</h1>
      <div className="ResumeBuilderRow row ">
        <div className='ResumeBuilderDiv1 col-md-6 col-12'>
          <form onSubmit={handleSubmit}>
            <div className='Name'>
              <div className="mb-3 col-md-5">
                <label for="exampleInputEmail1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />


              </div>
              <div className="mb-3 col-md-5">
                <label for="exampleInputPassword1" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className='Contact'>
              <div className="mb-3 col-md-5 ">
                <label for="exampleInputEmail1" className="form-label">
                  Mobile
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  minlength="10"
                  required
                />


              </div>
              <div className="mb-3 col-md-5">
                <label for="exampleInputPassword1" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='Address'>
              <div className="mb-3 col-md-5">
                <label for="exampleInputEmail1" className="form-label">
                  Post Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setPostCode(e.target.value)}
                  value={postCode}
                />

              </div>
              <div className="StreetName mb-3 col-md-5 col-5">
                <label for="exampleInputPassword1" className="form-label">
                  Street Name
                </label><br />
                <select name="Street Name" id="StreetName" ></select>
                {/* <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                /> */}
              </div>
            </div>
            <div className='Address1'>
              <div className="mb-3 col-md-5">
                <label for="exampleInputEmail1" className="form-label">
                  County
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="countyid"
                  aria-describedby="emailHelp"
                  onChange={(e) => setCounty(e.target.value)}
                  value={county}
                />

              </div>
              <div className="mb-3 col-md-5">

                <label for="exampleInputPassword1" className="form-label">
                  Country
                </label>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Select Country
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                    {countryList.map((data) => {
                      return <li key={data.name}><a class="dropdown-item" href="#">{data.name}</a></li>

                    })}
                    {/* <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                  </ul>
                </div>
                {/* <select name="Country" id="Country"></select> */}
                {/* <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                /> */}
              </div>
            </div>
            <div className='SkillsExperience'>
              <div className="mb-3 col-md-5">

                <div className='col-md-12'>
                  <label for="exampleInputPassword1" className="form-label">
                    Skills
                  </label>
                </div>
                <div className='d-flex'>
                  <div className='ExperiencePlus col-md-2'>
                    <img src={plus} alt="" onClick={additionSkills} />
                  </div>
                  <div className='col-md-10'>
                    <input
                      type="text"
                      className="form-control input-field "

                      id="exampleInputPassword1"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                    {skillList != [] ? (
                      <ul>
                        {skillList.map((t) => (
                          <li >
                            {t.value}


                            <button className="delete" onClick={(e) => deletetaskSkills(e, t.id)}>
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mb-3 col-md-5">

                <div className='col-md-12'>
                  <label for="exampleInputPassword1" className="form-label">
                    Experience
                  </label>
                </div>
                <div className='d-flex'>
                  <div className='ExperiencePlus col-md-2'>
                    <img src={plus} alt="" onClick={additionExperience} />
                  </div>
                  <div className='col-md-10'>
                    <input
                      type="text"
                      className="form-control input-field "
                      id="exampleInputPassword1"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />

                    {experienceList != [] ? (
                      <ul>
                        {experienceList.map((t) => (
                          <li >
                            {t.value}


                            <button className="delete" onClick={(e) => deletetaskExperience(e, t.id)}>
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}</div>
                </div>
              </div>
            </div>
            <div className='Education'>
              <div className="mb-3 col-md-5">

                <div className='col-md-12'>
                  <label for="exampleInputPassword1" className="form-label">
                    Education
                  </label>
                </div>
                <div className='d-flex'>
                  {/* <div className='ExperiencePlus col-md-2'>
                    <img src={plus} alt="" />
                  </div> */}
                  <div className='col-md-12'>
                    <input
                      type="text"
                      className="form-control input-field "
                      id="exampleInputPassword1"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    /></div>

                </div>
              </div>
              <div className="Role mb-3 col-md-5">
                <label for="exampleInputPassword1" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>


            </div>
            <div className='profilePic'>
              <div className="mb-3 col-md-5">
                <label for="exampleInputEmail1" className="form-label">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                // value={profilePic}
                />


              </div>
              <div className="mb-3 col-md-5">
                <label for="exampleInputPassword1" className="form-label">
                  Career objective
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={careerObjective}
                  onChange={(e) => setCareerObjective(e.target.value)}
                />
              </div>
            </div>
            {errorMessage ? (
              <p style={{ color: "red" }}>All fields are required</p>
            ) : null}

            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
            <i className="bi-class-name"></i>

          </form>


        </div>
        {
          show ?
            <div className='ResumeBuilderDiv2 col-md-6 col-12 '>
              <div className='top col-md-12  col-12'>
                <div className='profileDiv'>
                  <div className='profileSize'>
                    {profilePic && <ImageThumb image={profilePic} />}
                  </div>
                  <div className='name col-md-6'>
                    <h1>{firstName}{"  "}{lastName}</h1>
                    <p>{role}</p></div>
                </div>
                <div className='address col-md-6 '> <p>
                  {buildingName}</p>
                  <p>{county}</p>
                  <p>{country}</p>
                  <p>{email}</p>
                  <p>{mobile}</p></div>
              </div>
              <div className='CareerObjective col-md-12 col-12'>
                <h1>Career Objective</h1>
                <p>{careerObjective}</p>
              </div>
              <div className='professionalExperience col-md-12'>
                <h1>Professional Experience</h1>

                {experienceList != [] ? (
                  <ul>
                    {experienceList.map((t) => (
                      <li >
                        {t.value}



                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className='education col-md-12'>
                <h1>Education</h1>
                <h2>{education}</h2>

              </div>

              <div className='keySkills col-md-12'>
                <h1>Key Skills</h1>

                {skillList != [] ? (
                  <ul>
                    {skillList.map((t) => (
                      <li >
                        {t.value}



                      </li>
                    ))}
                  </ul>
                ) : null}





              </div>
            </div> : <style>
              {`.ResumeBuilderDiv2{
    border: 2px solid rgb(0, 90, 128);
}`}
            </style>
        }
      </div>
    </div>
  )
}

export default ResumeBuilder