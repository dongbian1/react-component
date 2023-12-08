import './style/index.scss';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Image,Modal } from 'antd';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useEffect } from 'react';

import { CheckImgProps, CheckImgRef } from './types';

const CheckImg = forwardRef<CheckImgRef, CheckImgProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [selectIndex, setSelectIndex] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    show: (arr, select) => {
      setImgArr(arr);
      setSelectIndex(select);
      setVisible(true);
    },
  }));

  useEffect(() => {
    if (imgArr.length > 1) {
      if (visible) {
        window.addEventListener('keydown', onKeyDown, false);
      } else {
        window.removeEventListener('keydown', onKeyDown, false);
      }
    }
  }, [visible]);

  useEffect(() => {
    const sel_master = document.getElementById('sel_master') || {
      scrollLeft: 0,
    };
    sel_master.scrollLeft = (selectIndex - 5) * 80 + 10;
  }, [selectIndex]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft') {
        setSelectIndex((prevState) => {
          return prevState === 0 ? prevState : prevState - 1;
        });
      } else if (event.code === 'ArrowRight') {
        setSelectIndex((prevState: number) => {
          return prevState === imgArr.length - 1 ? prevState : prevState + 1;
        });
      }
    },
    [imgArr]
  );

  return (
    <Modal
      title={props.title}
      width={600}
      open={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <div className='sel_master' id='sel_master'>
        {imgArr.map((item, index) => {
          return (
            <div
              key={index}
              className={selectIndex === index ? 'sel_title' : undefined}
              style={{ marginRight: index < imgArr.length - 1 ? 10 : 0 }}
            >
              <Image
                width={80}
                src={item}
                placeholder
                preview={false}
                onClick={() => setSelectIndex(index)}
              />
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: 20, display: 'flex' }}>
        <div>
          {selectIndex > 0 && (
            <div
              className='round'
              onClick={() => setSelectIndex(selectIndex - 1)}
            >
              <LeftOutlined
                style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}
              />
            </div>
          )}
        </div>
        <Image
          width={550}
          src={imgArr[selectIndex]}
          placeholder
          preview={false}
        />
        <div>
          {selectIndex < imgArr.length - 1 && (
            <div
              className='round'
              style={{ right: 26 }}
              onClick={() => setSelectIndex(selectIndex + 1)}
            >
              <RightOutlined
                style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
});

CheckImg.displayName = 'CheckImg';

export default CheckImg;
