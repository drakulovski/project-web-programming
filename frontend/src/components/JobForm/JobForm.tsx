import React, { Component } from 'react';
import { Button, Row, Col, Alert } from 'antd';
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
import { IJob } from '../../Models/Models';
import { Input, InputNumber, Switch } from 'formik-antd';
import ReactSelect from 'react-select';
import * as Yup from 'yup';
import { API } from '../../api';
import styled from 'styled-components';
import { LoremIpsum } from '../Helpers/Constants';

const { TextArea } = Input;

const ErrorMessage = styled(FormikErrorMessage)`
  color: red;
`;

const TextFillerButtons = styled(Button)`
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

interface Props {
  handleSubmit: Function;
  job?: IJob;
  title: string;
}
interface State {}

interface IFormData {
  title: string;
  description: string;
  qualifications: string;
  ratePerDay: boolean;
  rate: number;
  location: string;
  isCompany: boolean;
  available: boolean;
  categoryId: number;
  industryId: number;
}

const PostJobSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(100, 'Too Short!')
    .max(1500, 'Too Long!')
    .required('Required'),
  qualifications: Yup.string().min(30, 'Too Short!').max(1500, 'Too Long!'),
  ratePerDay: Yup.bool(),
  rate: Yup.number().min(5, 'Minimum rate is 5'),
  location: Yup.string().min(2, 'Too Short'),
  isCompany: Yup.bool(),
  available: Yup.bool(),
  categoryId: Yup.number().required().min(1, 'Please select Category'),
  industryId: Yup.number().required().min(1, 'Please select Indusrty'),
});

class JobForm extends Component<Props, State> {
  public static defaultProps = {
    job: {
      title: '',
      description: '',
      qualifications: '',
      ratePerDay: false,
      rate: 4,
      location: '',
      available: false,
      isCompany: false,
      availableOnWeekends: false,
      category: { id: -1, name: '' },
      industry: { id: -1, name: '' },
    },
  };
  state = {
    selectedCategory: {
      value: -1,
      label: 'Select Category',
    },
    allCategories: [],
    selectedIndustry: {
      value: -1,
      label: 'Select Industry',
    },
    allIndustries: [],
  };

  componentDidMount() {
    API.Industry.getIndustries().then((response) => {
      const formattedIndustries = response.industryList.map((industry) => ({
        value: industry.id,
        label: industry.name,
      }));
      this.setState({ allIndustries: formattedIndustries }, () => {
        if (this.props.job.industry.id !== -1) {
          this.setState({
            selectedIndustry: {
              value: this.props.job.industry.id,
              label: this.props.job.industry.name,
            },
          });
        }
      });
    });
    API.Category.getCategories().then((response) => {
      const formattedIndustries = response.categoryList.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      this.setState({ allCategories: formattedIndustries }, () => {
        if (this.props.job.category.id !== -1) {
          this.setState({
            selectedCategory: {
              value: this.props.job.category.id,
              label: this.props.job.category.name,
            },
          });
        }
      });
    });
  }

  render() {
    const { job, title } = this.props;
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: job.title,
          description: job.description,
          qualifications: job.qualifications,
          ratePerDay: job.ratePerDay,
          rate: job.rate,
          location: job.location,
          available: job.available,
          isCompany: job.company,
          availableOnWeekends: job.availableOnWeekends,
          categoryId: job.category.id,
          industryId: job.industry.id,
        }}
        validationSchema={PostJobSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { handleSubmit } = this.props;
          const { selectedIndustry, selectedCategory } = this.state;
          const mappedRequest = {
            title: values.title,
            description: values.description,
            qualifications: values.qualifications,
            ratePerDay: values.ratePerDay,
            rate: values.rate,
            location: values.location,
            available: values.available,
            company: values.isCompany,
            availableOnWeekends: values.availableOnWeekends,
            categoryId: selectedCategory.value as number,
            industryId: selectedIndustry.value as number,
          };
          handleSubmit(mappedRequest);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <React.Fragment>
            <Col span={24}>
              <Container>
                <h1>{title}</h1>
                <Alert
                  message="If there is no Category or Industry please create one before posting job!"
                  type="info"
                />
              </Container>
            </Col>
            <Form>
              <Row gutter={[5, 18]}>
                <Col span={24}>
                  <Input type="title" name="title" placeholder="Title" />
                  <ErrorMessage name="title" component="div" />
                </Col>
                <Col span={24}>
                  Sole Proprietor
                  <Switch name="isCompany" style={{ marginLeft: '5px' }} />{' '}
                  Company
                  <ErrorMessage name="isCompany" component="div" />
                </Col>
                <Col span={24}>
                  <TextArea
                    rows={4}
                    name="description"
                    placeholder="Description"
                  />
                  <ErrorMessage name="description" component="div" />
                  <TextFillerButtons
                    onClick={() => setFieldValue('description', LoremIpsum)}
                  >
                    Lorem ipsum for Description
                  </TextFillerButtons>
                </Col>
                <Col span={24}>
                  <TextArea
                    rows={4}
                    name="qualifications"
                    placeholder="Qualifications"
                  />
                  <ErrorMessage name="qualifications" component="div" />
                  <TextFillerButtons
                    onClick={() => setFieldValue('qualifications', LoremIpsum)}
                  >
                    Lorem ipsum for Qualifications
                  </TextFillerButtons>
                </Col>
                <Col span={24}>
                  <Input type="location" name="location" placeholder="City" />
                  <ErrorMessage name="location" component="div" />
                </Col>
                <Col span={24}>
                  Rate{' '}
                  <InputNumber
                    type="rate"
                    name="rate"
                    placeholder="Rate"
                  ></InputNumber>
                  <ErrorMessage name="rate" component="div" />
                </Col>
                <Col span={24}>
                  Rate per Day
                  <Switch
                    name="ratePerDay"
                    style={{ marginLeft: '5px' }}
                  />{' '}
                  Rate Per Hour
                  <ErrorMessage name="ratePerDay" component="div" />
                </Col>
                <Col span={24}>
                  Currently available
                  <Switch name="available" style={{ marginLeft: '5px' }} />
                  <ErrorMessage name="available" component="div" />
                </Col>
                <Col span={24}>
                  Available on weekends
                  <Switch
                    name="availableOnWeekends"
                    style={{ marginLeft: '5px' }}
                  />
                  <ErrorMessage name="availableOnWeekends" component="div" />
                </Col>
                <Col span={24}>
                  <Field
                    name="categoryId"
                    component={({ field, form }: any) => (
                      <ReactSelect
                        placeholder={'Select Category'}
                        isMulti={false}
                        options={this.state.allCategories}
                        value={this.state.selectedCategory}
                        onChange={(option: any) => {
                          this.setState(
                            {
                              selectedCategory: {
                                value: option.value,
                                label: option.label,
                              },
                            },
                            () => {
                              form.setFieldValue(field.name, option.value);
                            }
                          );
                        }}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  <ErrorMessage name="categoryId" component="div" />
                </Col>
                <Col span={24}>
                  <Field
                    name="industryId"
                    component={({ field, form }: any) => (
                      <ReactSelect
                        placeholder={'Select Industry'}
                        isMulti={false}
                        options={this.state.allIndustries}
                        value={this.state.selectedIndustry}
                        onChange={(option: any) => {
                          this.setState(
                            {
                              selectedIndustry: {
                                value: option.value,
                                label: option.label,
                              },
                            },
                            () => {
                              form.setFieldValue(field.name, option.value);
                            }
                          );
                        }}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  <ErrorMessage name="industryId" component="div" />
                </Col>
                <Col span={9} offset={11}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </React.Fragment>
        )}
      </Formik>
    );
  }
}

export default JobForm;
