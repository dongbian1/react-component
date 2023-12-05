import { ModalProps } from 'antd';
import { FormProps, Rule } from 'antd/es/form';
import { ReactNode } from 'react';

export interface ModalFormProp<T = any, V = any> extends ModalProps {
  // Form 表单数据
  data?: T;
  // Form 表单 form属性，方便父级组件通过useForm 操作Form表单
  formProps?: Omit<FormProps, 'children'>;
  // Form 表单每行显示个数
  formLayout?: 'one' | 'two';
  // 每个FormItem
  formItem: ModalFormItem[];
  // Form表单验证提交事件，此事件会返回form验证完成之后参数
  onSubmit?: (formValue: V) => void;
  // modal 框Footer底部OK按钮事件
  footerOk?: () => void;
  // modal 框Footer底部cancel事件
  footerCancel?: () => void;
  // modal 框底部按钮属性，如果未传入footerOk事件将调用onSubmit，如果未传入cancel事件将调用onCancel
  modalFooter?: (
    ok: () => void,
    cancel: (() => void) | ModalProps['onCancel']
  ) => ReactNode;
}

/**
 * FormItem 参数
 */
export interface ModalFormItem {
  // 标题
  title: string;
  // 输入框类型
  type:
    | 'input'
    | 'password'
    | 'inputNumber'
    | 'textArea'
    | 'select'
    | 'cascader'
    | 'switch'
    | 'radio'
    | 'upload'
    | 'datePicker'
    | 'rangePicker'
    | 'treeSelect';
  // Form name属性
  name: string;
  // 验证规则
  rules?: Rule[];
  // 选择框option
  selectArr?: Array<{ label: string; value: string | number }>;
  // 输入框props属性 根据 Antd 文档编写相应属性 uploadNumber 图片上传个数
  enterProps?: { uploadNumber?: number; [k: string]: any };
  // 自定义FormItem
  render?: () => React.ReactNode | React.ReactNode[];
}
