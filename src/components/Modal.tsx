import ReactDom from 'react-dom'
import { flexCenter } from '../_mixin';
interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    className: string
}
export default function Modal({onClose, children, className}: ModalProps) {

    return ReactDom.createPortal(
        <>
                    <div className={`fixed bottom-0 top-0 left-0 right-0 bg-light/75 ${flexCenter}`} onClick={onClose} >
                        <div className={`${flexCenter} w-6/12 p-10 bg-dark text-light relative rounded-lg ${className}`}
                        onClick={(e) => e.stopPropagation()}
                        >
                                <button className={`absolute top-3 left-3 text-light hover:cursor-pointer hover:text-red-700`} 
                                onClick={onClose}>X</button>
                            <div className="modal-content">
                                {children}
                            </div>
                        </div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}