import { useTranslate, useApiUrl, BaseKey } from "@refinedev/core";
import { Edit, getValueFromEvent, useSelect } from "@refinedev/antd";
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
    Grid,
} from "antd";

import { ICategory } from "../../interfaces";

const { Text } = Typography;

type EditBookProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
    editId?: BaseKey;
};

export const EditBook: React.FC<EditBookProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
    editId,
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
            <Edit
                saveButtonProps={saveButtonProps}
                resource="book"
                recordItemId={editId}
                contentProps={{
                    style: {
                        boxShadow: "none",
                    },
                    bodyStyle: {
                        padding: 0,
                    },
                }}
            >
                <Form {...formProps} layout="vertical">
                    <Form.Item label={t("books.fields.imageURL.label")}>
                        <Form.Item
                            name="imageURL"
                            valuePropName="fileList"
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload.Dragger
                                name="file"
                                action={`${apiUrl}/media/upload`}
                                listType="picture"
                                maxCount={1}
                                accept=".png"
                            >
                                <Space direction="vertical" size={2}>
                                    <Avatar
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "256px",
                                        }}
                                        src="/images/book-default-img.png"
                                        alt="Store Location"
                                    />
                                    <Text
                                        style={{
                                            fontWeight: 800,
                                            fontSize: "16px",
                                            marginTop: "8px",
                                        }}
                                    >
                                        {t(
                                            "books.fields.images.description",
                                        )}
                                    </Text>
                                    <Text style={{ fontSize: "12px" }}>
                                        {t("books.fields.images.validation")}
                                    </Text>
                                </Space>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
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
                        name={["category", "id"]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select {...categorySelectProps} />
                    </Form.Item>
                    <Form.Item
                        label={t("books.fields.isActive")}
                        name="isActive"
                    >
                        <Radio.Group>
                            <Radio value={true}>{t("status.enable")}</Radio>
                            <Radio value={false}>{t("status.disable")}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};
