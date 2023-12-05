import { PlusOutlined } from '@ant-design/icons';
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';

import { ModalFormItem, ModalFormProp } from './types';

const formItemMinLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const formItemMaxLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const ModalForm: React.FC<ModalFormProp> = ({
  data,
  formProps = {
    form: useForm()[0],
  },
  formItem,
  formLayout = 'one',
  onSubmit,
  modalFooter,
  ...modalProps
}: ModalFormProp) => {
  useEffect(() => {
    formProps.form?.setFieldsValue(data);
  }, [data]);

  // 初始化上传按钮配置
  useEffect(() => {
    verifyUploadBottom();
  }, []);

  // 上传Item按钮显示
  const [uploadBottom, setUploadBottom] = useState<{ [key: string]: boolean }>(
    {}
  );

  // 图标查看器
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [previewTitle, setPreviewTitle] = useState<string | undefined>(
    undefined
  );

  /**
   * form表单提交
   */
  const onFormSubmit = () => {
    formProps.form?.validateFields().then((values) => {
      const uploadNameArr = formItem
        .filter((item) => item.type === 'upload')
        .map((item) => item.name);
      if (uploadNameArr.length > 0) {
        for (let i = 0; i < uploadNameArr.length; i++) {
          const key = uploadNameArr[i];
          const errNum = values[key]?.filter(
            (uItem: UploadFile) => uItem.status === 'error'
          );
          if (errNum && errNum.length > 0) {
            message.error('上传组件中存在上传失败文件，请删除后操作~');
            return;
          }
        }
      }
      onSubmit && onSubmit(values);
    });
  };

  /**
   * 排版Layout
   */
  const Layout = () => {
    return modalProps.width && parseInt(modalProps.width as string) > 500
      ? formItemMaxLayout
      : formItemMinLayout;
  };

  /**
   * FormItem valuePropName 值
   * @param item 渲染条件
   */
  const propName = (item: ModalFormItem) => {
    switch (item.type) {
      case 'switch':
        return 'checked';
      case 'upload':
        return 'fileList';
      default:
        return undefined;
    }
  };

  // 设置如何将 event 的值转换成字段值
  const normFile = (e: any, name: string) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.file) {
      const item = formItem.find((item) => item.name === name);
      let butVis = true;
      const fileList = e.fileList.filter((item: any) => item.status);
      if (item?.enterProps?.uploadNumber) {
        if (fileList) {
          butVis = fileList.length < item.enterProps.uploadNumber;
        }
        setUploadBottom({ ...uploadBottom, [name]: butVis });
      }
      return fileList;
    }
    return e;
  };

  /**
   * 上传按钮显示
   */
  const verifyUploadBottom = () => {
    const bottom: { [key: string]: boolean } = {};
    formItem
      ?.filter((item) => item.type === 'upload')
      .map((item) => {
        bottom[item.name] = true;
        if (item.enterProps?.uploadNumber) {
          if (formProps.form?.getFieldValue(item.name)) {
            bottom[item.name] =
              formProps.form?.getFieldValue(item.name).length <
              item.enterProps?.uploadNumber;
          }
        }
      });
    setUploadBottom(bottom);
  };

  // 图片上传按钮
  const uploadBut = (
    <div>
      <PlusOutlined />
      <div className='ant-upload-text'>上传</div>
    </div>
  );

  // 上传图片
  const handleChange = (
    file: UploadChangeParam<UploadFile<any>>,
    name: string
  ) => {
    const fileList = file.fileList
      ?.filter((item) => item.status === 'done')
      .map((fileItem: any, index: number) => {
        if (fileItem.response && fileItem.response.code === 200) {
          return {
            uid: index,
            name: fileItem.name,
            status: fileItem.status,
            url: fileItem.response.data,
          };
        }
      });
    if (file.file.status === 'done') {
      formProps.form?.setFieldsValue({
        ...formProps.form?.getFieldsValue(),
        [name]: fileList,
      });
    }
  };

  // 查看图片
  const handlePreview = (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewTitle(file.name);
    setPreviewVisible(true);
  };

  // 关闭图片查看
  const handleCancel = () => {
    setPreviewVisible(false);
  };

  /**
   * 表单渲染
   * @param item 渲染条件
   */
  const moduleRendering = (item: ModalFormItem) => {
    if (item.render) {
      return item.render();
    }
    switch (item.type) {
      case 'input':
        return (
          <Input placeholder={`请输入${item.title}`} {...item.enterProps} />
        );
      case 'password':
        return (
          <Input.Password
            placeholder={`请输入${item.title}`}
            {...item.enterProps}
          />
        );
      case 'inputNumber':
        return (
          <InputNumber
            placeholder={`请输入${item.title}`}
            style={{ width: '100%' }}
            min={0}
            {...item.enterProps}
          />
        );
      case 'textArea':
        return <Input.TextArea rows={2} {...item.enterProps} />;
      case 'select':
        return (
          <Select
            placeholder={`请选择${item.title}`}
            filterOption={(input, option) =>
              option?.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            {...item.enterProps}
          >
            {item.selectArr?.map((selectItem) => {
              return (
                <Select.Option key={selectItem.value} value={selectItem.value}>
                  {selectItem.label}
                </Select.Option>
              );
            })}
          </Select>
        );
      case 'treeSelect':
        return (
          <TreeSelect
            placeholder={`请选择${item.title}`}
            {...item.enterProps}
          />
        );
      case 'switch':
        return (
          <Switch
            checkedChildren={
              item.enterProps ? item.enterProps.checkedChildren : '开'
            }
            unCheckedChildren={
              item.enterProps ? item.enterProps.unCheckedChildren : '关'
            }
            {...item.enterProps}
          />
        );
      case 'radio':
        return (
          <Radio.Group {...item.enterProps}>
            {item.selectArr?.map((selectItem) => {
              return (
                <Radio key={selectItem.value} value={selectItem.value}>
                  {selectItem.label}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case 'upload':
        return (
          <Upload
            withCredentials
            listType='picture-card'
            accept='.jpg,.png,.jpeg,.bmp'
            beforeUpload={(file) => {
              if (file.size / 1024 / 1024 > 2) {
                message.error('请选择大小在2M以内图片！');
                return false;
              }
            }}
            onPreview={handlePreview}
            onChange={(file) => handleChange(file, item.name)}
            {...item.enterProps}
          >
            {uploadBottom
              ? uploadBottom[item.name]
                ? uploadBut
                : null
              : uploadBut}
          </Upload>
        );
      case 'datePicker':
        return (
          <DatePicker
            style={{ width: '100%' }}
            placeholder={`请选择${item.title}`}
            {...item.enterProps}
          />
        );
      case 'rangePicker':
        return (
          <DatePicker.RangePicker format='YYYY-MM-DD' {...item.enterProps} />
        );
    }
  };

  return (
    <>
      <Modal
        {...modalProps}
        destroyOnClose
        afterClose={() => {
          modalProps.afterClose && modalProps.afterClose();
          formProps.form?.resetFields();
        }}
        footer={
          modalFooter
            ? modalFooter(onFormSubmit, modalProps.onCancel)
            : modalProps.footer
        }
        onOk={modalProps.onOk ?? onFormSubmit}
      >
        <Form
          {...formProps}
          labelCol={formProps.labelCol ?? Layout().labelCol}
          wrapperCol={formProps.wrapperCol ?? Layout().wrapperCol}
          scrollToFirstError
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {formItem.map((item) => {
              return (
                <Col
                  key={item.name}
                  span={formLayout === 'one' ? 24 : 12}
                  style={
                    item.type === 'upload'
                      ? { position: 'relative' }
                      : undefined
                  }
                >
                  <Form.Item
                    name={item.name}
                    label={item.title}
                    rules={item.rules}
                    valuePropName={propName(item)}
                    getValueFromEvent={
                      item.type === 'upload'
                        ? (args) => normFile(args, item.name)
                        : undefined
                    }
                  >
                    {moduleRendering(item)}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        </Form>
      </Modal>
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ModalForm;
