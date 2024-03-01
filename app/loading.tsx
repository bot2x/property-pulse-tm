"use client";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display : 'block',
    margin : '100px auto'
}

interface LoadingPageProps {
  loading : boolean,
};

const LoadingPage = ({loading} : LoadingPageProps) => {
// const LoadingPage = () => {
  return (
    <ClipLoader
        color='#3b82f6'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
};

export default LoadingPage;