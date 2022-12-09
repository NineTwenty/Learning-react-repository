import { Formik, Form, FormikHelpers } from 'formik';
import TextAreaField from 'components/TextAreaField';
import SubmitField from 'components/SubmitField';
import Separator from 'components/Separator';
import { useSelector } from 'react-redux';
import { fetchFeed, getIsLoadingPostStatus } from 'data/entities';
import Wrapper from 'components/Wrapper/Wrapper';
import type { AppDispatch } from 'data/store';
import { useAppDispatch, useIdParam } from 'utils/hooks/hooks';
import type { Feed } from 'utils/prismaUtils';
import style from './PostingForm.module.css';

type UnregisteredPost = { postText: string; feedId: Feed['id'] };

type Props = {
  header: string;
  onSubmit: (
    newPost: UnregisteredPost
  ) => (dispatch: AppDispatch) => Promise<void>;
};

type FormValues = {
  postText: string;
};

const validate = (values: FormValues) => {
  if (!values.postText) {
    return { postText: 'Field is empty' };
  }
};

function PostingForm({ header, onSubmit }: Props) {
  const dispatch = useAppDispatch();
  const id = useIdParam();

  if (!id) {
    throw new Error(`id URL param is not set`);
  }

  const dispatchOnSubmit = async (
    posts: FormValues,
    formikBag: FormikHelpers<FormValues>
  ) => {
    const post = { ...posts, feedId: id };

    void dispatch(onSubmit(post));
    // Update changed feed
    void dispatch(fetchFeed(id));

    formikBag.resetForm();
  };

  const isLoading = useSelector(getIsLoadingPostStatus);

  const initialValues: FormValues = {
    postText: '',
  };

  return (
    <Wrapper className={style.wrapper}>
      <h3 className={style.header}>{header}</h3>
      <Separator />
      <Formik
        initialValues={initialValues}
        onSubmit={dispatchOnSubmit}
        validate={validate}
      >
        <Form data-testid='postingForm' className={style.form}>
          <TextAreaField name='postText' disabled={isLoading} />
          <Separator />
          <div className={style.submitField}>
            <SubmitField buttonText='Post' />
          </div>
        </Form>
      </Formik>
    </Wrapper>
  );
}

export default PostingForm;
