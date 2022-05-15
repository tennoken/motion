import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
	constructor(title: string, url: string) {
		super(`<section class="video">
        	<div class="video__player"><iframe class="video__iframe"></iframe></div>
        	<h3 class="video__title"></h3>
    	</section>`);
		const titleElement = this.element.querySelector(
			'.video__title'
		)! as HTMLHeadingElement;
		titleElement.textContent = title;
		const iframeElement = this.element.querySelector(
			'.video__iframe'
		)! as HTMLIFrameElement;
		iframeElement.title = title;
		iframeElement.src = this.convertToEmbededUrl(url);
	}

	private convertToEmbededUrl(url: string): string {
		const regExp =
			/^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
		const match = url.match(regExp);

		const videoId = match ? match[1] || match[2] : undefined;

		if (videoId) {
			return `https://www.youtube.com/embed/${videoId}`;
		}
		return url;
	}
}

// https://www.youtube.com/watch?v=J-_aXK5dJco
// https://youtu.be/J-_aXK5dJco
// https://www.youtube.com/embed/J-_aXK5dJco

// <iframe
// 	class='youtube__video'
// 	width='950'
// 	height='534'
// 	src=''
// 	title=''
// 	frameborder='0'
// 	allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
// 	allowfullscreen
// ></iframe>;
