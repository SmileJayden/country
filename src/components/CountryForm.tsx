import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { addCountry, CountryFormType as FormData } from '~/store/country';
import { useDispatch } from 'react-redux';

const FormWrapper = styled.form`
  width: 300px;
  background-color: antiquewhite;
  color: navy;
  display: flex;
  flex-direction: column;
  padding: 10px;

  label {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 120px;

    span {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    input,
    select {
      padding: 12px;
    }

    p {
      position: absolute;
      color: red;
      top: 78px;
    }
  }

  button {
    cursor: pointer;
    margin-top: 20px;
    padding: 20px;
  }
`;

const schema = yup.object().shape({
  name: yup.string().required('국가 이름을 입력 하시오'),
  alpha2Code: yup.string().required('국가 코드을 입력 하시오'),
  callingCodes: yup
    .number()
    .typeError('숫자를 입력 하시오')
    .positive('0보다 큰 수를 입력 하시오')
    .integer('정수를 입력 하시오')
    .required('국가 번호를 입력 하시오'), // never comes here...
  capital: yup.string().required('수도를 입력 하시오'),
  region: yup.string().required('대륙을 입력 하시오'),
});

const CountryForm = () => {
  const { register, errors, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const onSubmit = (formData: FormData) => {
    dispatch(addCountry(formData));
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="form-name">
        <span>국가 이름</span>
        <input id="form-name" type="text" name="name" ref={register()} />
        <p>{errors.name?.message}</p>
      </label>
      <label htmlFor="form-code">
        <span>국가 코드</span>
        <input id="form-code" type="text" name="alpha2Code" ref={register()} />
        <p>{errors.alpha2Code?.message}</p>
      </label>
      <label htmlFor="form-calling-codes">
        <span>국가 ID</span>
        <input
          id="form-calling-codes"
          type="text"
          name="callingCodes"
          ref={register()}
        />
        <p>{errors.callingCodes?.message}</p>
      </label>
      <label htmlFor="form-capital">
        <span>국가 수도 이름</span>
        <input id="form-capital" type="text" name="capital" ref={register()} />
        <p>{errors.capital?.message}</p>
      </label>
      <label htmlFor="form-name">
        <span>대륙</span>
        <select id="form-region" name="region" ref={register()} defaultValue="">
          <option value="" disabled hidden>
            Select your option
          </option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <p>{errors.region?.message}</p>
      </label>
      <button type="submit">국가 추가 +</button>
    </FormWrapper>
  );
};

export default CountryForm;
