import {useTranslate, useApiUrl, useCustom, useCustomMutation} from "@refinedev/core";
import { Create, getValueFromEvent, useSelect } from "@refinedev/antd";
import {
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    InputNumber,
    Radio,
    Select,
    Space,
    ButtonProps,
    Avatar,
    Typography,
    Upload,
    Grid, Button,
} from "antd";

import {IBook, ICategory} from "../../interfaces";
import {UploadOutlined} from "@ant-design/icons";

const { Text } = Typography;


type CreateBookProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const CreateBook: React.FC<CreateBookProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const t = useTranslate();
    const apiUrl = useApiUrl();

    const breakpoint = Grid.useBreakpoint();

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "category",
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            zIndex={1001}
        >
            <Create
                resource="book"
                // enctype="multipart/form-data"
                saveButtonProps={saveButtonProps}
                goBack={false}
                contentProps={{
                    style: {
                        boxShadow: "none",
                    },
                    bodyStyle: {
                        padding: 0,
                    },
                }}
            >
                <Form
                    {...formProps}
                    // enctype="multipart/form-data"
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                    }}
                >
                    {/*<Form.Item label={t("books.fields.imageURL.label")}>*/}
                    {/*    <Form.Item*/}
                    {/*        name="imageURL"*/}
                    {/*        // valuePropName="fileList"*/}
                    {/*        // getValueFromEvent={getValueFromEvent}*/}

                    {/*        noStyle*/}
                    {/*        rules={[*/}
                    {/*            {*/}
                    {/*                required: true,*/}
                    {/*            },*/}
                    {/*        ]}*/}
                    {/*    >*/}
                    {/*        <Upload.Dragger*/}
                    {/*            name="file"*/}
                    {/*            // action={`${apiUrl}/media/upload`}*/}
                    {/*            // action={`${apiUrl}/upload`}*/}
                    {/*            listType="picture"*/}
                    {/*            maxCount={1}*/}
                    {/*            accept=".png,.jpg,.jpeg"*/}
                    {/*        >*/}
                    {/*            <Space direction="vertical" size={2}>*/}
                    {/*                <Avatar*/}
                    {/*                    style={{*/}
                    {/*                        width: "100%",*/}
                    {/*                        height: "100%",*/}
                    {/*                        maxWidth: "256px",*/}
                    {/*                    }}*/}
                    {/*                    src="/images/book-default-img.png"*/}
                    {/*                    alt="Store Location"*/}
                    {/*                />*/}
                    {/*                <Text*/}
                    {/*                    style={{*/}
                    {/*                        fontWeight: 800,*/}
                    {/*                        fontSize: "16px",*/}
                    {/*                        marginTop: "8px",*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    {t(*/}
                    {/*                        "books.fields.images.description",*/}
                    {/*                    )}*/}
                    {/*                </Text>*/}
                    {/*                <Text style={{ fontSize: "12px" }}>*/}
                    {/*                    {t("books.fields.images.validation")}*/}
                    {/*                </Text>*/}
                    {/*            </Space>*/}
                    {/*        </Upload.Dragger>*/}
                    {/*    </Form.Item>*/}
                    {/*</Form.Item>*/}

                    {/*<Form.Item*/}
                    {/*    name="imageURL"*/}
                    {/*    label="Upload"*/}
                    {/*    valuePropName="fileList"*/}
                    {/*    // getValueFromEvent={normFile}*/}
                    {/*    // extra="longgggggggggggggggggggggggggggggggggg"*/}
                    {/*>*/}
                    {/*    /!*<Upload name="imageURL" listType="picture">*!/*/}
                    {/*    /!*    <Button icon={<UploadOutlined />}>Click to upload</Button>*!/*/}
                    {/*    /!*</Upload>*!/*/}
                    {/*    <Upload name="imageURL">*/}
                    {/*        /!*<Button icon={<UploadOutlined />}>Click to Upload</Button>*!/*/}
                    {/*    </Upload>*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item*/}
                    {/*    label={t("books.fields.imageURL")}*/}
                    {/*    name="file"*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            required: true,*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Input type="file" name="file"/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item
                        label={t("books.fields.name")}
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.description")}
                        name="description"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea rows={6} />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.price")}
                        name="price"
                        rules={[
                            {
                                required: true,
                                type: "number",
                            },
                        ]}
                    >
                        <InputNumber
                            formatter={(value) => `$ ${value}`}
                            style={{ width: "150px" }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.category")}
                        name="categoryId"
                        // name={["category", "id"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select {...categorySelectProps} />
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    label={t("books.fields.isActive")}*/}
                    {/*    name="isActive"*/}
                    {/*>*/}
                    {/*    <Radio.Group>*/}
                    {/*        <Radio value={true}>{t("status.enable")}</Radio>*/}
                    {/*        <Radio value={false}>{t("status.disable")}</Radio>*/}
                    {/*    </Radio.Group>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Create>
        </Drawer>
    );
};
