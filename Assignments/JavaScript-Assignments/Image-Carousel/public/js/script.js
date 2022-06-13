class ImageCarousel {
  constructor(imgCarouselId, transitionPeriod, holdPeriod) {
    this.carouselContainer = document.querySelector(`#${imgCarouselId}`);
    this.imageWrapper =
      this.carouselContainer.querySelectorAll(".image_wrapper")[0];
    this.pictures = this.imageWrapper.children;
    this.totalPictures = this.pictures.length;

    this.imgWidth = 800;
    this.curIndex = 0;
    this.carouselPlace = 0;

    this.transitionPeriod = transitionPeriod;
    this.holdPeriod = holdPeriod;

    this.pictures[0].addEventListener("load", this.setImgHeight);
    this.carouselPlay();
  }

  setImgHeight = () => {
    this.imageWrapper.style.height = `${this.pictures[0].height}px`;
  };
  nextSlide = () => {
    this.normalSlideDot(this.curIndex, this.slideDots, this.pictures);
    this.curIndex === this.totalPictures - 1
      ? (this.curIndex = 0)
      : this.curIndex++;
    this.activeSlideDot(this.curIndex, this.slideDots, this.pictures);

    if (this.curIndex) {
      const slideTransition = setInterval(() => {
        this.carouselPlace = this.carouselPlace + this.transitionSpeed;
        if (this.carouselPlace > this.imgWidth * this.curIndex) {
          this.carouselPlace = this.imgWidth * this.curIndex;
          clearInterval(slideTransition);
        }
        this.imageWrapper.style.left = `-${this.carouselPlace}px`;
      }, 5);
    } else {
      const slideTransition = setInterval(() => {
        this.carouselPlace = this.carouselPlace - this.transitionSpeed;
        if (this.carouselPlace < 0) this.carouselPlace = 0;
        this.imageWrapper.style.left = `-${this.carouselPlace}px`;
        if (this.carouselPlace == 0) {
          clearInterval(slideTransition);
        }
      }, 0);
    }
  };
  previousSlide = () => {
    this.normalSlideDot(this.curIndex, this.slideDots, this.pictures);

    if (this.curIndex) {
      const slideTransition = setInterval(() => {
        this.carouselPlace = this.carouselPlace - this.transitionSpeed;
        if (this.carouselPlace < this.imgWidth * this.curIndex) {
          this.carouselPlace = this.imgWidth * this.curIndex;
          clearInterval(slideTransition);
        }
        this.imageWrapper.style.left = `-${this.carouselPlace}px`;
      }, 5);
    } else {
      this.imageWrapper.style.left = "0px";
      const slideTransition = setInterval(() => {
        this.carouselPlace = this.carouselPlace + this.transitionSpeed;
        if (this.carouselPlace > this.imgWidth * this.curIndex) {
          this.carouselPlace = this.imgWidth * this.curIndex;
          clearInterval(slideTransition);
        }
        this.imageWrapper.style.left = `-${this.carouselPlace}px`;
      }, 0);
    }
    this.curIndex === 0
      ? (this.curIndex = this.totalPictures - 1)
      : this.curIndex--;
    this.activeSlideDot(this.curIndex, this.slideDots, this.pictures);
  };
  normalSlideDot(index, slideDots) {
    slideDots[index].style.backgroundColor = "#b9b9b9";
  }
  activeSlideDot(index, slideDots) {
    slideDots[index].style.backgroundColor = "#ffffff";
  }

  carouselPlay() {
    if (window.screen.availWidth < this.imgWidth) {
      this.carouselContainer.style.width = `100%`;
      this.imgWidth = window.screen.availWidth;
    } else {
      this.carouselContainer.style.width = `${this.imgWidth}px`;
    }
    this.carouselContainer.style.overflow = `hidden`;
    this.carouselContainer.style.position = `relative`;
    this.carouselContainer.style.margin = `0 auto`;
    this.imageWrapper.style.position = `relative`;
    this.imageWrapper.style.height = `${this.pictures[0].height}px`;
    this.transitionSpeed = this.imgWidth / (this.transitionPeriod / 5);

    //placing the pictures horizontally
    for (let i = 0; i < this.pictures.length; i++) {
      this.pictures[i].style.left = `${this.imgWidth * i}px`;
      this.pictures[i].style.top = `0`;
      this.pictures[i].style.position = `absolute`;
    }

    const navControls = document.createElement("div");
    this.carouselContainer.append(navControls);

    const carouselButtons = document.createElement("div");

    navControls.append(carouselButtons);

    const previousButtonDiv = document.createElement("div");
    const previousButton = document.createElement("img");
    previousButton.setAttribute("src", "images/left-arrow.png");
    previousButtonDiv.style.position = "absolute";
    previousButtonDiv.style.left = "0";
    previousButtonDiv.style.top = "0";
    previousButtonDiv.style.height = "100%";
    previousButton.style.position = "relative";
    previousButton.style.top = "50%";
    previousButton.style.transform = "translateY(-50%)";
    previousButton.style.cursor = "pointer";

    previousButtonDiv.append(previousButton);
    carouselButtons.append(previousButtonDiv);

    previousButtonDiv.addEventListener("click", this.previousSlide);

    const nextButtonDiv = document.createElement("div");
    const nextButton = document.createElement("img");
    nextButton.setAttribute("src", "images/right-arrow.png");
    nextButtonDiv.style.position = "absolute";
    nextButtonDiv.style.right = "0";
    nextButtonDiv.style.top = "0";
    nextButtonDiv.style.height = "100%";
    nextButton.style.position = "relative";
    nextButton.style.top = "50%";
    nextButton.style.transform = "translateY(-50%)";
    nextButton.style.cursor = "pointer";

    nextButtonDiv.append(nextButton);
    carouselButtons.append(nextButtonDiv);

    nextButtonDiv.addEventListener("click", this.nextSlide);

    const dotDiv = document.createElement("div");
    dotDiv.style.position = "absolute";
    dotDiv.style.bottom = "4%";
    dotDiv.style.left = "50%";
    dotDiv.style.transform = "translateX(-50%)";
    dotDiv.style.display = "flex";

    navControls.append(dotDiv);

    for (let i = 0; i < this.totalPictures; i++) {
      let dot = document.createElement("div");

      dot.style.width = "12px";
      dot.style.height = "12px";
      dot.style.margin = "5px";
      dot.style.borderRadius = "50%";
      dot.style.cursor = "pointer";
      dot.style.backgroundColor = "#b9b9b9";
      dot.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.7)";
      dotDiv.append(dot);

      dot.addEventListener("click", () => {
        let clickedDot = i;
        let changeSlide = this.curIndex - clickedDot;
        if (changeSlide > 0) {
          for (let i = changeSlide; i != 0; i--) {
            this.previousSlide();
          }
        } else if (changeSlide < 0) {
          for (let i = changeSlide; i != 0; i++) {
            this.nextSlide();
          }
        }
      });
    }
    this.slideDots = Array.from(dotDiv.children);
    this.activeSlideDot(this.curIndex, this.slideDots, this.pictures);

    //running SlideShow
    this.slideShow();
  }

  slideShow() {
    this.autoSlideChange = setInterval(() => {
      this.nextSlide();
    }, this.holdPeriod);
  }
}

//ImageCarousel(ImageCarouselId, transitionPeriod, holdPeriod)
let ImageCarousel1 = new ImageCarousel("image_carousel", 1000, 6000);
let ImageCarousel2 = new ImageCarousel("image_carousel_1", 500, 4000);
let ImageCarousel3 = new ImageCarousel("image_carousel_2", 200, 3000);
