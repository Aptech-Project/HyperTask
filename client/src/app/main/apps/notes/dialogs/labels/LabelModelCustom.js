
import { FuseUtils } from '@fuse';

function LabelModelCustom(data, profile) {
  let labels = JSON.parse(profile.labels)
  let maxId = 0;
  for (let index = 0; index < labels.length; index++) {
    const element = labels[index];
    if (element.id > maxId) {
      maxId = element.id
    }
  }
  console.log("LabelModelCustom")
  console.log(labels)
  const item = data ? data : {};
  return {
    id: item.id || FuseUtils.generateGUID(),
    name: item.name || '',
    get handle() {
      return FuseUtils.handleize(this.name)
    }
  }
}

export default LabelModelCustom;
