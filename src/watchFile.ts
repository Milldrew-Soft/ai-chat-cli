import choki from "chokidar";
type ChangeHandler = () => void;
export function watchFileChange(path: string, changeHandler: ChangeHandler) {
  const watcher = choki.watch(path, {
    ignoreInitial: true,
  });

  watcher.on("change", (path) => {
    changeHandler();
  });
}
