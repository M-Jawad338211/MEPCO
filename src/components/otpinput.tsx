import React, { useState } from 'react'
// import OtpInput from 'react-otp-input';

interface prop {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
}
export default function Input({ value, valueLength, onChange }: prop) {
  // const [otp, setOtp] = useState('');
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  return (
    <div style={{ display: 'flex', width: '55%', maxWidth: "360px", columnGap: '10px', marginLeft: '23%', marginTop: '2%'}}>
      {/* {[ 4].map((digit, idx) => (
        <OtpInput
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          style={{ width: '100%', height: '50%', border: '1px solid #ccc',borderRadius: "5px",textAlign: 'center',fontSize: '32px',fontWeight: '100',lineHeight: 1,backgroundColor: "#EAEFF5"}}
            value={digit}
        />
      ))} */}

      {/* <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>     </span>}
      style={{ width: '100%', height: '50%', border: '1px solid #ccc',borderRadius: "5px",textAlign: 'center',fontSize: '32px',fontWeight: '100',lineHeight: 1,backgroundColor: "#EAEFF5"}}
      renderInput={(props) => <input {...props} />}
    /> */}

      {otp.map((data, index) => {
        return (
          <input
            className="otp-field"
            type="text"
            name="otp"
            maxLength={valueLength}
            key={index}
            value={data}
            style={{ width: '100%', height: '50%', border: '1px solid #EAEFF5', borderRadius: "5px", textAlign: 'center', fontSize: '32px', fontWeight: '100', lineHeight: 1, backgroundColor: "#EAEFF5", padding: '1%' }}
            onChange={e => handleChange(e.target, index)}
            onFocus={e => e.target.select()}
          />
        );
      })}
    </div>
  )
}