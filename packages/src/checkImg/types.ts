/**
 * 图片查看器ref事件
 */
export interface CheckImgRef {
  /**
   * 打开图片查看器
   * @param arr 图片数组
   * @param select 当前查看图片下标
   * @returns
   */
  show: (arr: string[], select: number) => void;
}

/**
 * 图片查看器Props属性
 */
export interface CheckImgProps {
  /**
   * modal标题属性
   */
  title: string;
}
