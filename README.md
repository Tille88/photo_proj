# photo_proj

Personal sandbox project photo display, will be fleshed out and stylized as per below.

Currently:
- Loads images lazily depending on currently shown image
- Changes image on click on ImageViewer or thumbnail viewer
- Using Canvas for image viewing
- Base setup for build system
- Given the information needed, the index.js file gives settings for each of the images that could be needed.

This is enough to figure out most required interfaces and objects needed for cleanup. Main focus will be on transitions.

## Things that will be implemented, approximately in order of listing
- **Image viewing changes:**

	- [ ] Make image viewing location change depending on property. Some will be displayed two images at a time using same Canvas, other having only one image centered.

	- [ ] Likely duck-type implementation needed, pushing base functionality to prototyle, that will be invoked by specializing functions.

- **Functionality ImageViewer to add:**

	- [ ] Interactions through scroll (scroll snapping), change image on left/right arrow etc.

	- [ ] On hover + mousemove, show thumbnail viewer (hidden by default).

	- [ ] On hover, show next/prev indication overlay on imageviewer to ensure user knows to click to change image

	- [ ] Autoplay/pause functionality

- **Data loading changes:**

	- [ ] On resize, will need to check which already cached image data is of insufficient size and reload if needed. With throttle/delay.
	
	- [ ] Spinner if currently loading/processing transitions, SVG-based

- **First image effects:**
	
	- [ ] SVG filter/masks effect, showing color/bw versions of same image, including text (info button), etc. "welcome page", circle crops...
	
- **Formalizing infrastructure (leading to refactoring of the sandbox version):**

	- [ ] Implement testing framework, and start by testing base functionality, since TDD seems like the way to go about:

	- [ ] Factory sugar creation, should include (and avoid regular class style code):
		- Public (publicly avalible )
		- Mixin Public (appr. Object.assign functionality)
		- Shared (methods mainly, delegates, but also 'static' like functionality...)
		- Private (global, can be accessed throughout methods, or function scope)
		- Functional mixins
		- Interface helper (sugar on top of having Early in object.assign-list a object which implements base implementation OR these with simply errors if not implemented)
		- Public, Shared, Private, Interface, should be able to be called sequentially or in one step where applicable.
		- Optional:
			- Static methods/constants
			- Composability of different factories... need to cache imput though
			- Callable with .of([optional])
			- If init() method, should be called on intialization. Already have factory function, can be lazy initialized through using that already...
			
	- [ ] Other functionality not tested this early
	
	- [ ] Refactor previous code using above helpers

	- [ ] Add documentation to more obvious previously written code now when abstractions are more settled.

- **Worker:**

	- [ ] Webworker infrastructure will be needed for image processing as seen in step below:
	
- **Transitions (MAIN PRIO FOR PROJECT, SIMPLE LIBRARY-LIKE STRUCTURE OF FUNCTIONALITY)**

	- [ ] BW photos: Line/edge detection test first (Canny), if not visually effective, manually extract focus points of images and connect with image corners. Transition line with 'water fill effects' for posterialized photo of transitions.

	- [ ] CL photos: Delaunay triangulation => Polygon effects, main idea is morphing into next image as transition, alternative: flipping triangles into next image, or exit scene and comes back into scene if too heavy...

	- [ ] If morphing, may need to use spatial query methods to make search for nearest 'untaken neighbour' fast enough...

	- [ ] Possibly need tweening/combining of effects infrastructure

- **LOWER PRIO:**

	- [ ] EVENT EMITTER OBJECT: full functionality (now only communicating for hooking up events, due to no change of views). Isolated so left for late.

	- [ ] THUMBNAIL VIEWER: Replace with better implementation. Now placeholder depending on incorrect usage of flexbox.

	- [ ] CSS/SCSS CLEANUP: Will be kept minimal, but will need more rigour if this will be built upon eventually

	- [ ] LIGHT DIRECTION: analyze image for light direction?

	- [ ] GENERALIZATIONS: alternative implementation to WebGL for heavy image processing
	
	- [ ] GENERALIZATIONS: make work differnetly for differnt screen sizes
	
	- [ ] GENERALIZATIONS: precalculated/processed transitions data if no webworker/slow processing
