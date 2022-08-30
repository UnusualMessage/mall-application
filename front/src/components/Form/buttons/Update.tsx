import {Button, Popconfirm, Space} from "antd";

export const Update = ({ isLoading, handleDelete }: Props) => {
	return (
		<Space>
			<Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
				Изменить
			</Button>
			
			{
				handleDelete ?
					<Popconfirm title={"Удалить?"} okText={"Да"} cancelText={"Нет"} onConfirm={handleDelete}>
						<Button type="primary" danger loading={isLoading} disabled={isLoading}>
							Удалить
						</Button>
					</Popconfirm>
					: <></>
			}
		</Space>
	);
};

interface Props {
	isLoading: boolean,
	handleDelete?: () => void,
}