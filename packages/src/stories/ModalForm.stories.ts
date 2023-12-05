import type { Meta, StoryObj } from "@storybook/react";

import ModalForm from "../modalForm/modal";
import { ModalFormProp } from "../modalForm/types";

const meta: Meta<ModalFormProp> = {
  title: "Example/ModalForm",
  component: ModalForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      description: "打开modal",
      defaultValue: {
        summary: false,
      },
    },
    title: {
      description: "Modal 框标题",
    },
    formItem: {
      description: "form 表单属性",
    },
  },
};

export default meta;
type Story = StoryObj<ModalFormProp>;

export const Default: Story = {
  args: {
    open: false,
    title: "测试ModalForm",
    formItem: [
      {
        title: "测试",
        name: "test",
        type: "input",
        rules: [{ required: true, message: "Please input your username!" }],
      },
    ],
  },
};
