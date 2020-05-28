import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Components/context'
import { Button, TextInput } from 'react-native-paper';
import * as yup from 'yup'; 

export default function RegisterScreen({ navigation }) {

  const { signUp } = React.useContext(AuthContext)

  const handleSubmit = (values) => {
    delete values.passwordConfirmation;
    signUp(values)
  }

  let registerSchema = yup.object({
    mobile_no:yup.string().required('Mobile No is Required').test('len','Must Need to have 10 digits',val=>(val!=undefined)?(val.length===10)?true:false:false),
    password: yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters or Numbers.'),
    first_name:yup.string().required('First Name is Required'),
    last_name:yup.string().required('Last Name is Required'),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match'),
    nic_no:yup.string().required('NIC No is Required'),
    nearest_eco_center:yup.string().required('Required Field'),
    vehicle_color:yup.string().required('Vehicle Color is Required'),
    vehicle_type:yup.string().required('Vehicle Type is Required'),
    maximam_weight_can_carry:yup.string().required('This field is Required'),
    vehicle_plate_no:yup.string().required('Vehicle Plate No is Required'),
})

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.txtLogin}>Fill These Details</Text>
        <Formik
          initialValues={{ password: '', first_name: '', last_name: '', mobile_no: '', nic_no: '', nearest_eco_center: '', vehicle_color: '',passwordConfirmation:'', vehicle_type: '', maximam_weight_can_carry: '', vehicle_plate_no: '' }}
          onSubmit={values => handleSubmit(values)}
          validationSchema={registerSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values,touched,errors}) => (
            <View>
              <TextInput
                style={styles.textInputTop}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                label="First Name"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.first_name && errors.first_name}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                label="Last Name"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.last_name && errors.last_name}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('mobile_no')}
                onBlur={handleBlur('mobile_no')}
                value={values.mobile_no}
                label="Mobile No"
                keyboardType="phone-pad"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.mobile_no && errors.mobile_no}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                label="Password"
                secureTextEntry={true}
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.password && errors.password}</Text>
              <TextInput
              style={styles.textInput}
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              label="ReEnter Password"
              secureTextEntry={true} 
              mode="outlined"
            />
            <Text style={styles.errorMsg}>{touched.passwordConfirmation && errors.passwordConfirmation}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('nic_no')}
                onBlur={handleBlur('nic_no')}
                value={values.nic_no}
                label="NIC NO"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.nic_no && errors.nic_no}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('nearest_eco_center')}
                onBlur={handleBlur('nearest_eco_center')}
                value={values.nearest_eco_center}
                label="Nearest Eco Center"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.nearest_eco_center && errors.nearest_eco_center}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('vehicle_color')}
                onBlur={handleBlur('vehicle_color')}
                value={values.vehicle_color}
                label="Vehicle Color"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.vehicle_color && errors.vehicle_color}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('vehicle_type')}
                onBlur={handleBlur('vehicle_type')}
                value={values.vehicle_type}
                label="Vehicle Type"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.vehicle_type && errors.vehicle_type}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('maximam_weight_can_carry')}
                onBlur={handleBlur('maximam_weight_can_carry')}
                value={values.maximam_weight_can_carry}
                label="Maximum Weight Can Carry"
                keyboardType="numeric"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.maximam_weight_can_carry && errors.maximam_weight_can_carry}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('vehicle_plate_no')}
                onBlur={handleBlur('vehicle_plate_no')}
                value={values.vehicle_plate_no}
                label="Vehicle Plate No"
                mode="outlined"
              />
              <Text style={styles.errorMsg}>{touched.vehicle_plate_no && errors.vehicle_plate_no}</Text>
              {/* <Button style={styles.btn} onPress={handleSubmit} title="Submit" /> */}
              <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
                <Text style={{ color: "white" }}>Sign Up</Text>
              </Button>
            </View>
          )}
        </Formik>

      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 15,
    marginTop: 6,
  },
  textInputTop: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
    marginHorizontal: 80,
    paddingVertical: 6,
    marginBottom: 30,
    borderRadius: 30
  },
  txtLogin: {
    marginTop: 45,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4fc116',
    marginHorizontal: 15,
  },
  errorMsg:{
    color:'red',
    marginHorizontal: 15,
}

});
