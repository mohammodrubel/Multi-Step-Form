import { Button, Steps, Form as AntForm, Input, message } from 'antd';
import React, { useState } from 'react';

const StepForm = ({ step, onFinish, updateFormValues, formFields, form }) => {
  const handleFinish = (values) => {
    updateFormValues(step, values);
    message.success(`Step ${step} completed!`);
    onFinish();
  };

  return (
    <AntForm
      form={form}
      onFinish={handleFinish}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
    >
      {formFields.map((field) => (
        <AntForm.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={[{ required: true, message: `Please input ${field.label}!` }]}
        >
          <Input placeholder={`Enter ${field.label}`} />
        </AntForm.Item>
      ))}
    </AntForm>
  );
};

function MultiStepForm() {
  const [current, setCurrent] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [form] = AntForm.useForm();

  const next = async () => {
    try {
      const values = await form.validateFields();
      updateFormValues(current, values);
      setCurrent(current + 1);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const updateFormValues = (step, values) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      updateFormValues(current, values);
      message.success('Form submitted successfully!');
      console.log('All form values:', formValues);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const steps = [
    {
      title: 'Basic Information',
      content: (
        <StepForm
          step={1}
          onFinish={next}
          updateFormValues={updateFormValues}
          formFields={[
            { name: 'adviser_serial', label: 'Adviser Serial' },
            { name: 'designation', label: 'Designation' },
            { name: 'biography', label: 'Biography' },
            { name: 'short_biography', label: 'Short Biography' },
          ]}
          form={form}
        />
      ),
    },
    {
      title: 'Personal Information',
      content: (
        <StepForm
          step={2}
          onFinish={next}
          updateFormValues={updateFormValues}
          formFields={[
            { name: 'state_province', label: 'State/Province' },
            { name: 'country', label: 'Country' },
            { name: 'country_of_residence', label: 'Country of Residence' },
            { name: 'postal_code', label: 'Postal Code' },
          ]}
          form={form}
        />
      ),
    },
    {
      title: 'Clinic Information',
      content: (
        <StepForm
          step={3}
          onFinish={next}
          updateFormValues={updateFormValues}
          formFields={[
            { name: 'clinic_name', label: 'Clinic Name' },
            { name: 'clinic_address', label: 'Clinic Address' },
            { name: 'clinic_address_line_1', label: 'Clinic Address Line 1' },
            { name: 'clinic_address_line_2', label: 'Clinic Address Line 2' },
            { name: 'clinic_city', label: 'Clinic City' },
          ]}
          form={form}
        />
      ),
    },
    {
      title: 'Education and Experience',
      content: (
        <StepForm
          step={4}
          onFinish={next}
          updateFormValues={updateFormValues}
          formFields={[
            { name: 'education', label: 'Education' },
            { name: 'experience', label: 'Experience' },
            { name: 'career_title', label: 'Career Title' },
          ]}
          form={form}
        />
      ),
    },
    {
      title: 'Pricing Information',
      content: (
        <StepForm
          step={5}
          onFinish={next}
          updateFormValues={updateFormValues}
          formFields={[
            { name: 'pricing', label: 'Pricing' },
            { name: 'price', label: 'Price' },
          ]}
          form={form}
        />
      ),
    },
    {
      title: 'Finish',
      content: (
        <div>
          <h3>Review your information and click submit to finish</h3>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: '90%', margin: '0 auto', marginTop: '20px' }}>
      <Steps size="small" current={current}>
        {steps.map((step, index) => (
          <Steps.Step key={index} title={step.title} />
        ))}
      </Steps>
      <div style={{ width: '90%', margin: '0 auto', textAlign: 'center', marginTop: '20px' }}>
        {steps[current].content}
      </div>
      <div style={{ width: '70%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {current > 0 && (
          <Button type='dashed' style={{ flex: 1, marginRight: '10px' }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type='dashed' style={{ flex: 1 }} onClick={next}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;
