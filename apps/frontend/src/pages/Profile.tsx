import { TUser } from "@arseniy/types";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormInput } from "../components/FormInput";
import { ProfileButtos } from "../components/ProfileButtons";
import { IConfirmDeletion } from "../components/TodoInfo";
import { deleteUser, logout, updateUser } from "../features/user/actions";
import { useToast } from "../hooks/useToast";
import { AuthResponse } from "../models/response/AuthResponse";
import { useDispatch, useSelector } from "../store/store";
import { Modal } from "../components/Modal";

const Profile: FC = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user as TUser);
	const { id, name } = user || { id: "", name: "" };
	const { showSuccess, showError } = useToast();
	const { t } = useTranslation();
	const [userName, setUserName] = useState(name);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	const isFormChanged = userName !== name;

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		if (!id) {
			showError(t("error.id"));
			return;
		}

		if (!userName) {
			showError(t("error.empty"));
			return;
		}

		dispatch(updateUser({ id, name: userName }))
			.unwrap()
			.then((updatedUser: AuthResponse) => {
				setUserName(updatedUser.name);
				showSuccess(t("success.profile"));
			})
			.catch((error) => {
				showError(error.message || t("error.profile"));
			});
	};

	const handleLogout = () => {
		dispatch(logout());
		showSuccess(t("success.logout"));
	};

	const handleCancel = (e: SyntheticEvent) => {
		e.preventDefault();
		setUserName(name);
	};

	const handleDelete = () => {
		dispatch(deleteUser(user?.id));
		setIsDeleteModalOpen(false);
		showSuccess(t("success.delete"));
	};

	const handleOpenModal = () => {
		setIsDeleteModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsDeleteModalOpen(false);
	};

	return (
		<Box>
			<VStack as="form" spacing="4" onSubmit={handleSubmit} mt="8">
				<FormInput
					type="text"
					placeholder={t("user.name")}
					onChange={handleInputChange}
					value={userName}
					name="name"
				/>
				<Text fontSize="lg">
					{user?.isActivated ? t("user.activated") : t("user.not-activated")}
				</Text>

				{isFormChanged && <ProfileButtos handleCancel={handleCancel} />}
				<Flex gap="4">
					<Button variant="link" colorScheme="blue" onClick={handleLogout}>
						{t("user.logout")}
					</Button>
					<Button variant="link" colorScheme="red" onClick={handleOpenModal}>
						{t("user.delete")}
					</Button>
				</Flex>
				{isDeleteModalOpen && (
					<Modal title={t("modal.user_title")} handleClose={handleCloseModal}>
						<ConfirmUserDeletion
							handleDelete={handleDelete}
							handleCloseModal={handleCloseModal}
						/>
					</Modal>
				)}
			</VStack>
		</Box>
	);
};

const ConfirmUserDeletion: FC<IConfirmDeletion> = ({
	handleDelete,
	handleCloseModal,
}) => {
	const { t } = useTranslation();
	return (
		<Flex justifyContent="center" alignItems="center" mt="28" gap="8">
			<Button colorScheme="red" mr={3} onClick={handleDelete} w="24">
				{t("modal.delete")}
			</Button>
			<Button onClick={handleCloseModal} w="24">
				{t("user.cancel")}
			</Button>
		</Flex>
	);
};

export default Profile;
