_🎶 imagine there's no z-index... it's easy if you try... 🎶_
# use-layers

### problem

if you ever had multiple elements with `position: absolute` in your app (e.g. modals, popovers, tooltips), you had to use zIndexes to determine which one should be shown on top of another. you likely know how painful it is to manage:
- values are arbitrary: no consistency between projects / packages
- - sometimes not even within a project
- - think `zIndex: 9999999` etc. 😵‍💫
- stacking contests
- - parent zIndex takes precedence over nested element's zIndex, leading to confusion

examples from the wild:

![zIndex](https://user-images.githubusercontent.com/2622838/223994802-ef5f3789-2ec4-48b2-80a3-bc7b02b8a4ca.png)

![zindex wut](https://user-images.githubusercontent.com/2622838/223994818-23d2bd83-d0cd-44a8-a528-2bfbba21d48d.png)

### solution

i had a dream: never having to define a single zIndex again. just wrap your app with a layer provider and tell it which elements it should keep track of. every time one of the elements is displayed, put it on top.

### usage

```
const App = () => (
  <Layers>
    <MyComponent />
  </Layers>
)
```
```
const MyComponent = () => (
  // it doesn't matter where you `showModalOne` condition comes from. 
  // whenever it becomes true, the `<Layer>` component will ensure your element is placed on top.
  {showModalOne && (
    <Layer>
      <ModalElementOne />
    </Layer>
  )}

  {showModalTwo && (
    <Layer>
      <ModalElementTwo />
    </Layer>
  )}
)
```

### roadmap:
- [x] Layer container component
- [x] basic example
- [x] types
- [x] useLayers hook
- [x] example for useLayers hook
- [ ] tests
- [x] readme
- [ ] better layer ID
- [ ] more advanced examples
- [x] remove lodash dependency
- [ ] ¿replace context with observables?

## License

MIT © szamanr
