import {Modal, Upload, UploadFile, UploadProps} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import {FC, useState} from "react";

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});

const ImageInput: FC = () => {
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	
	const handleCancel = () => setPreviewVisible(false);
	
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}
		
		setPreviewImage(file.url ?? (file.preview as string));
		setPreviewVisible(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
	};
	
	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
		setFileList(newFileList);
	
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	
	return (
		<>
			<Upload action={""}
			        listType="picture-card"
			        fileList={fileList}
			        onPreview={handlePreview}
			        onChange={handleChange}
			>
				{fileList.length >= 1 ? null : uploadButton}
			</Upload>
			<Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
		</>
	);
};

export default ImageInput;