import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface FormData {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: RegionEnum;
}

enum RegionEnum {
  Africa = 'Africa',
  Asia = 'Asia',
  Americas = 'Americas',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

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
    height: 130px;

    span {
      font-size: 18px;
      font-weight: bold;
    }

    input,
    select {
      padding: 20px;
    }

    p {
      position: absolute;
      color: red;
      top: 75px;
    }
  }

  button {
    margin-top: 20px;
    padding: 20px;
  }
`;

const CountryForm = () => {
  const { register, errors, handleSubmit } = useForm<FormData>();
  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="form-name">
        <span>국가 이름</span>
        <input
          id="form-name"
          type="text"
          name="name"
          ref={register({ required: true })}
        />
        <p>{errors.name && '국가 이름을 입력 하시오'}</p>
      </label>
      <label htmlFor="form-code">
        <span>국가 코드</span>
        <input
          id="form-code"
          type="text"
          name="alpha2Code"
          ref={register({ required: true })}
        />
        <p>{errors.alpha2Code && '국가 코드 입력 하시오'}</p>
      </label>
      <label htmlFor="form-calling-codes">
        <span>국가 번호</span>
        <input
          id="form-calling-codes"
          type="number"
          name="callingCodes"
          ref={register({ required: true })}
        />
        <p>{errors.callingCodes && '국가 번호을 입력 하시오'}</p>
      </label>
      <label htmlFor="form-capital">
        <span>국가 수도 이름</span>
        <input
          id="form-capital"
          type="text"
          name="capital"
          ref={register({ required: true })}
        />
        <p>{errors.capital && '국가의 수도 이름을 입력 하시오'}</p>
      </label>
      <label htmlFor="form-name">
        <span>대륙</span>
        <select
          id="form-region"
          name="region"
          ref={register({ required: true })}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Select your option
          </option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <p>{errors.region && '대륙 선택 하시오'}</p>
      </label>
      <button type="submit">나라 추가 +</button>
    </FormWrapper>
  );
};

export default CountryForm;
