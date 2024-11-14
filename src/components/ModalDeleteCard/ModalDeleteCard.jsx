import s from './ModalDeleteCard.module.css';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard } from '../../redux/cards/operations';
const ModalDeleteCard = ({ isOpen, onClose, onConfirm, cardIdToDelete }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;
  const handleConfirm = () => {
    if (cardIdToDelete) {
      console.log('Sending DELETE request for cardId:', cardIdToDelete);
      dispatch(deleteCard(cardIdToDelete));
    }
    onConfirm(cardIdToDelete);
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2 className={s.modalTitle}>
          Are you sure you want to delete this card?
        </h2>
        <div className={s.modalButtons}>
          <button onClick={handleConfirm} className={s.confirmButton}>
            <svg className={s.yesIcon} width="18" height="18">
              <use href={`${sprite}#icon-check`} />
            </svg>
            Yes
          </button>
          <button onClick={onClose} className={s.cancelButton}>
            <svg className={s.noIcon} width="18" height="18">
              <use href={`${sprite}#x-close-icon`} />
            </svg>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteCard;
