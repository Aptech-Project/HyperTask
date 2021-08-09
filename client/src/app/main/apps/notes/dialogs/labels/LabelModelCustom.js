
import { FuseUtils } from '@fuse';

function LabelModelCustom(data, profile) {
  let labels = JSON.parse(profile.labels)
  console.log("LabelModelCustom")
  console.log(labels)
  const item = data ? data : {};
  return {
    id: item.id || labels.length + 1,
    name: item.name || '',
    get handle() {
      return FuseUtils.handleize(this.name)
    }
  }
}

export default LabelModelCustom;
