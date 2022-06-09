import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

/**
 * @desc 加载 默认的 yaml 配置，默认的服务配置
 */
export default () => {
  return yaml.load(
    // 同步读取配置文件，防止 service 服务的阻塞
    readFileSync(join(__dirname, `config/${YAML_CONFIG_FILENAME}`), 'utf8'),
  ) as Record<string, any>;
};
