import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { useToast } from "@chakra-ui/toast";

import { Input } from "@chakra-ui/input";
const initialFValues = {
  _id:'',
  userId:'',
  username: '',
  email:'',
  CIN:'',
  city:'',
  password:'',
  desc: '',
  profilePicture: '',
  coverPicture: '',
}
export default function Model(props ) {
  const toast = useToast();
  var user=JSON.parse(localStorage.getItem('user'))
  var userId=user._id
  const { addOrEdit, recordForEdit } = props
  const [profilePicture, setprofilePicture] = useState();

    const [picLoading, setprofilePictureLoading] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
        temp.username = fieldValues.username ? "" : "Ce champ est obligatoire."
        temp.CIN = fieldValues.CIN ? "" : "Ce champ est obligatoire."
        temp.email = fieldValues.email ? "" : "Ce champ est obligatoire."

        setErrors({
        ...temp
    })

    if (fieldValues === values)
        return Object.values(temp).every(x => x === "")
}

    const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm
  } = useForm(initialFValues, true, validate);


  useEffect(() => {
    if (recordForEdit != null)
        setValues({
            ...recordForEdit
        })
}, [recordForEdit])

const postDetails = (pics) => {
    setprofilePictureLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_username", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setprofilePicture(data.url.toString());
          console.log(data.url.toString());

          setprofilePictureLoading(false);
        })

        .catch((err) => {
          console.log(err);
          setprofilePictureLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setprofilePictureLoading(false);
      return;
    }
  };


   
  const handleSubmit = e => {
    e.preventDefault()
  
    values.userId=userId
    if(profilePicture){
    values.profilePicture=profilePicture
    }


    if (validate()) {
    addOrEdit(values, resetForm); 
    }
}


    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                  <label>Nom d'utilisateur </label> 
                    <Input
                        name="username"
                        label="Nom"
                        value={values.username}

                        onChange={handleInputChange}
                        error={errors.username}
                    />
                  <label>CIN </label> 

                  <Input
                        name="CIN"
                        label="CIN"
                        value={values.CIN}

                        onChange={handleInputChange}
                        />

                      <label>Email </label> 

                    <Input
                        name="email"
                        label="email"
                        value={values.email}

                        onChange={handleInputChange}
                        />
                    <label>description </label> 

                          <Input
                        name="desc"
                        label="desc"
                        value={values.desc}

                        onChange={handleInputChange}
                        />
              

                       
                 

                </Grid>
                <Grid item xs={6}> 
                <label>ville </label> 

                    <Input
                           name="city"
                           label="city"
                             value={values.city}

                          onChange={handleInputChange}
                               />
                <label>Mot de passe </label> 

                          <Input
                        name="password"
                        label="password"

                        onChange={handleInputChange}
                        />
                <label>photo de profil </label> 
               
                    <Controls.Input
                         type="file"
                         p={1.5}
                         accept="image/*"
                         onChange={(e) => postDetails(e.target.files[0])}
                        />
                 

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Modifier" 
                            isLoading={picLoading} />
                        
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
