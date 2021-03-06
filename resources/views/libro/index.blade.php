@extends('layouts.master')

@section('content')
<!--Page content goes here, fixed elements go above the all elements class-->
<!--Page content goes here, fixed elements go above the all elements class-->
                <div class="header-clear-large"></div>

                <div class="container heading-style-5">
                    <h4 class="heading-title">Gallery Filterable</h4>
                    <i class="fa fa-camera-retro heading-icon"></i>
                    <div class="line bg-black"></div>
                    <p class="heading-subtitle">
                        On the same principle as a filterable portfolio, but you can choose to filter the images you
                        wish to see! Simple and easy! We recommend using 4 categories or less to keep them simple
                        and perfect for user experience on mobiles.
                    </p>
                </div>

                <!--Static Columns-->

                <div class="portfolio-filter">
                    <div class="portfolio-filter-categories">
                        <a href="" class="filter-category selected-filter" data-rel="all-cat">All</a>
                        @foreach($categorias as $key=>$categorias)
                        <!--<a href="#" class="filter-category selected-filter" data-rel="all-cat">All</a>-->
                        <a href="#" class="filter-category" data-rel="{{$categorias->categId}}">{{$categorias->categName}}</a>
                        @endforeach
                    </div>
                    <div class="clear"></div>
                    <div class="portfolio-filter-wrapper">
                      @foreach($libros as $key=>$libros)
                      <div class="{{$libros->libCategoria}} all-cat portfolio-filter-item">
                          <a class="show-gallery-1" href="compra/{{$libros->idLibro}}"><img src="{{$libros->libImage}}" height="150" width="150" alt="{{$libros->libNombre}}"></a>
                          <a href="compra/{{$libros->idLibro}}">Ir</a>
                      </div>
                      @endforeach
                    </div>
                </div>

                <div class="decoration"></div>

                <div class="footer">
                    <p class="center-text">Copyright 2015. All rights reserved.</p>
                    <div class="footer-icons">
                        <a href="#" class="scale-hover facebook-color social-ball"><i class="fa fa-facebook"></i></a>
                        <a href="#" class="scale-hover twitter-color social-ball"><i class="fa fa-twitter"></i></a>
                        <a href="#" class="scale-hover google-color social-ball"><i class="fa fa-google-plus"></i></a>
                        <a href="#" class="scale-hover back-to-top bg-green-dark social-ball"><i class="fa fa-angle-up"></i></a>
                        <a href="#" class="scale-hover show-share-bottom bg-magenta-dark social-ball"><i class="fa fa-retweet"></i></a>
                    </div>
                </div>

            <!-- End of entire page content-->
            </div>
        </div>
    </div>
    <a href="#" class="back-to-top-badge"><i class="fa fa-caret-up"></i>Back to top</a>
</div>


<!--Fly up share box and notifications go here -->
<!--These are the only features that should be placed outside the all-elements class-->




@stop
