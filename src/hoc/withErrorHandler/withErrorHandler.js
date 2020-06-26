import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        //console.log(error);
        let errorMessage = null;
        if (error) {
            if (error.response) {
                errorMessage = error.response.data.message ? error.response.data.message : error.message;
            } else {
                errorMessage = error.message;
            }            
        }

        return (
            <React.Fragment>
                <Modal show={!!error} modalClosed={clearError}>
                    {errorMessage}                  
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    }
}

export default withErrorHandler;