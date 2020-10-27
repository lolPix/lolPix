import React, {FunctionComponent, PropsWithChildren} from 'react';
import ReactDOM from 'react-dom';

type Props = {
    neutralButtonText: string,
    positiveButtonText?: string,
    neutralButtonCallback: React.MouseEventHandler;
    positiveButtonCallback: React.MouseEventHandler;
}

const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
                                                                children,
                                                                neutralButtonText, positiveButtonText,
                                                                neutralButtonCallback,
                                                                positiveButtonCallback
                                                            }: PropsWithChildren<Props>) => {
    return ReactDOM.createPortal(<div id={'modal'}>
        <div className="modal-content">{children}</div>
        <div className="modal-buttons">
            <button onClick={neutralButtonCallback} className="neutral">{neutralButtonText}</button>
            {
                positiveButtonText &&
                <button onClick={positiveButtonCallback} className="positive">{positiveButtonText}</button>
            }
        </div>
    </div>, document.getElementById('modal-overlay'));
};

export default Modal;
