import { useLink } from "@refinedev/core";
import { theme } from "antd";

import { BikeWhiteIcon, FineFoodsIcon } from "../../components";
import { Logo } from "./styled";
import React from "react";
import {
    Avatar,
    Card,
    Divider,
    InputNumber,
    Dropdown,
    Menu,
    Typography,
} from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const { useToken } = theme;

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { token } = useToken();
    const Link = useLink();

    return (
        <Logo>
            <Link to="/">
                {collapsed ? (
                    <BikeWhiteIcon
                        style={{
                            fontSize: "32px",
                            color: token.colorTextHeading,
                        }}
                    />
                ) : (
                    <Paragraph
                        style={{
                                    color: "black",
                                    width: "100%",
                                    height: "auto",
                                    textAlign: "center",
                                    alignItems: "center",
                                    fontWeight: "700",
                                    fontSize: "25px",
                                }}
                    >
                        CHISTORE
                    </Paragraph>
                    // <Typography>
                    // hrhhjj
                    // </Typography>
                    // <FineFoodsIcon
                    //     style={{
                    //         color: token.colorTextHeading,
                    //         width: "100%",
                    //         height: "auto",
                    //     }}
                    // />
                )}
            </Link>
        </Logo>
    );
};
