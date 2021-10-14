import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TextAreaField } from 'components/common/TextAreaField';
import SubmitField from 'components/common/SubmitField';
import { Separator } from 'components/common/Separator/Separator';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed, getIsLoadingPostStatus } from 'redux/entities';
import { Wrapper } from 'components/common/Wrapper/Wrapper';
import style from './PostingForm.module.css';

const validate = (values) => {
  if (!values.postText) {
    return 'Field is empty';
  }
};

const PostingForm = ({ header, onSubmit }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const dispatchOnSubmit = async (posts, formikBag) => {
    const post = { ...posts, feedId: id };

    await dispatch(onSubmit(post));
    // Update changed feed
    dispatch(fetchFeed(id));

    formikBag.resetForm();
  };

  const isLoading = useSelector(getIsLoadingPostStatus);

  return (
    <Wrapper className={style.wrapper}>
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
          <TextAreaField
            placeholder='Write something...'
            name='postText'
            disabled={isLoading}
          />
          <Separator />
          <div className={style.submitField}>
            <SubmitField buttonText='Post' />
          </div>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default PostingForm;
