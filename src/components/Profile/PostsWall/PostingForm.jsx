import React from 'react';
import style from './PostingForm.module.css';
import { Formik, Form } from 'formik';
import { TextAreaField } from 'components/common/TextAreaField';
import SubmitField from 'components/common/SubmitField';
import { Separator } from 'components/common/Separator/Separator';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoadingPostStatus } from 'redux/entities';

const validate = (values) => {
  if (!values.postText) {
    return 'Field is empty'
  }
}

const PostingForm = ({ header, onSubmit }) => {
  const dispatch = useDispatch();
  const dispatchOnSubmit = (posts) => dispatch(onSubmit(posts))

  const isLoading = useSelector(getIsLoadingPostStatus);

  return (
    <div className={style.wrapper}>
      <h3 className={style.header}>{header}</h3>
      <Separator />
      <Formik
        initialValues={{
          postText: '',
        }}
        onSubmit={dispatchOnSubmit}
        validate={validate}
      >
        <Form className={style.form}>
          <TextAreaField placeholder={'Write something...'} name='postText' disabled={isLoading} />
          <Separator />
          <div className={style.submitField}>
            <SubmitField />
          </div>
        </Form>
      </Formik>
    </div >
  );
};

export default PostingForm;
