class FeedController < ApplicationController
  include ActiveModel::Serializers::JSON

  before_action :logged_in_user, only: %i[top new memes fails gifs]
  helper_method :get_posts_top, :get_posts_new, :get_posts_memes, :get_posts_fails, :get_posts_gifs

  def top; end

  def new; end

  def memes; end

  def fails; end

  def gifs; end

  def get_posts_top
    Post.best_first.limit(15).to_a.map(&:serializable_hash)
  end

  def get_posts_new
    Post.newest_first.limit(15).to_a.map(&:serializable_hash)
  end

  def get_posts_memes
    Post.newest_first.memes.limit(15).to_a.map(&:serializable_hash)
  end

  def get_posts_fails
    Post.newest_first.fails.limit(15).to_a.map(&:serializable_hash)
  end

  def get_posts_gifs
    Post.newest_first.gifs.limit(15).to_a.map(&:serializable_hash)
  end

end
