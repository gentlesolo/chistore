import {
    useTranslate,
    CrudFilters,
    useUpdate,
    HttpError,
} from "@refinedev/core";
import { useSimpleList, CreateButton, useDrawerForm } from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import {
    Typography,
    Row,
    Col,
    List as AntdList,
    Input,
    Form,
    Modal,
    ModalProps,
} from "antd";

import {
    CreateBook,
    EditBook,
    BookItem,
    BookCategoryFilter,
} from "../book";
import { IStore, IBook } from "../../interfaces";
import { StyledStoreBooks } from "./styled";

const { Text } = Typography;

type StoreBooksProps = {
    record: IStore;
    modalProps: ModalProps;
};

export const StoreBooks: React.FC<StoreBooksProps> = ({
    record,
    modalProps,
}) => {
    const t = useTranslate();

    const { listProps, searchFormProps, queryResult } = useSimpleList<
        IBook,
        HttpError,
        { name: string; categories: string[] }
    >({
        resource: "books",
        pagination: { pageSize: 9 },
        syncWithLocation: false,
        onSearch: ({ name, categories }) => {
            const bookFilters: CrudFilters = [];

            if (categories.length > 0) {
                bookFilters.push({
                    field: "category.id",
                    operator: "in",
                    value: categories,
                });
            }

            if (name) {
                bookFilters.push({
                    field: "name",
                    operator: "contains",
                    value: name,
                });
            }

            return bookFilters;
        },
    });
    const { data: bookData } = queryResult;

    const mergedData =
        bookData?.data.map((book) => ({
            ...record?.books.find(
                (storeBook) => storeBook.id === book.id,
            ),
            ...book,
        })) ?? [];

    const { mutate } = useUpdate<IStore>();

    const updateStock = (changedValue: number, clickedBook: IBook) => {
        const shopBook = record.books.find(
            (p) => p.id === clickedBook.id,
        );

        if (shopBook) {
            shopBook.stock = changedValue;

            mutate({
                id: record.id,
                resource: "stores",
                values: {
                    books: record.books,
                },
                successNotification: false,
                mutationMode: "optimistic",
            });
        }
    };

    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm<IBook>({
        action: "create",
        resource: "books",
        redirect: false,
    });

    const {
        drawerProps: editDrawerProps,
        formProps: editFormProps,
        saveButtonProps: editSaveButtonProps,
        show: editShow,
    } = useDrawerForm<IBook>({
        action: "edit",
        resource: "books",
        redirect: false,
    });

    return (
        <>
            <Modal
                {...modalProps}
                width={1000}
                footer={null}
                bodyStyle={{ minHeight: "650px" }}
            >
                <Form
                    {...searchFormProps}
                    onValuesChange={() => searchFormProps.form?.submit()}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={18}>
                            <StyledStoreBooks>
                                <Text style={{ fontSize: "24px" }} strong>
                                    {t("stores.storeBooks")}
                                </Text>
                                <Form.Item name="name" noStyle>
                                    <Input
                                        style={{ width: "300px" }}
                                        placeholder={t("stores.bookSearch")}
                                        suffix={<SearchOutlined />}
                                    />
                                </Form.Item>
                                <CreateButton onClick={() => createShow()}>
                                    {t("stores.buttons.addBook")}
                                </CreateButton>
                            </StyledStoreBooks>
                            <AntdList
                                grid={{
                                    gutter: 8,
                                    xs: 1,
                                    sm: 1,
                                    md: 2,
                                    lg: 3,
                                    xl: 3,
                                    xxl: 3,
                                }}
                                style={{
                                    height: "100%",
                                    maxHeight: "548px",
                                    overflow: "auto",
                                    paddingRight: "4px",
                                }}
                                {...listProps}
                                dataSource={mergedData as IBook[]}
                                renderItem={(item) => (
                                    <BookItem
                                        item={item}
                                        updateStock={updateStock}
                                        editShow={editShow}
                                    />
                                )}
                            />
                        </Col>
                        <Col xs={0} sm={6}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "40px",
                                    marginBottom: "16px",
                                }}
                            >
                                <Text style={{ fontWeight: 500 }}>
                                    {t("stores.tagFilterDescription")}
                                </Text>
                            </div>
                            <Form.Item name="categories">
                                <BookCategoryFilter />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <CreateBook
                drawerProps={createDrawerProps}
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
            />
            <EditBook
                drawerProps={editDrawerProps}
                formProps={editFormProps}
                saveButtonProps={editSaveButtonProps}
            />
        </>
    );
};
