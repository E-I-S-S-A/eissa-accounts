import { useState } from "react";
import { EissaButton, EissaModal } from "react-reusable-elements";
import CloseIcon from "./../../assets/svg/close.svg"

type ProfileModalProps = {
    onClose: () => void;
    isVisible: boolean
}

const ProfileModal = (props: ProfileModalProps) => {

    const { isVisible, onClose } = props;

    const modelContent = () => {
        return <div>
            <EissaButton type="button" variant="primary" icon={CloseIcon} padding={0} bg={"var(--dark-grey)"} borderColor={"var(--dark-grey)"} onClick={onClose} />

        </div>
    }

    return <EissaModal isVisible={isVisible} ModalContent={modelContent} />
}

export default ProfileModal;